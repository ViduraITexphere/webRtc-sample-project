import store from "../../store/Store";
import {
  setCallerUsername,
  setCallState,
  callStates,
  setCallRejected,
  setLocalStream,
  setCallingDialogVisible,
  setRemoteStream,
  setScreenSharingActive,
  resetCallDataState,
} from "../../store/actions/CallAction";
import * as wss from "../wssConnection/wssConnection";
import { async } from "q";

// create pre offer answers
const preOfferAnswers = {
  CALL_ACCEPTED: "CALL_ACCEPTED",
  CALL_REJECTED: "CALL_REJECTED",
  CALL_NOT_AVAILABLE: "CALL_NOT_AVAILABLE",
};

//default constraints for video and audio
const defaultConstrains = {
  video: {
    width: 1280,
    height: 720,
  },
  audio: true,
};

const configuration = {
  // get our internet provider's public IP address to be used by STUN server
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

//getUserMedia allows web applications to access media devices
//and capture audio and video data from them.

let connectedUserSocketId;
let peerConnection;

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
      createPeerConnection();
    })
    .catch((err) => {
      console.log(
        "error occured when trying to get an access to get local stream"
      );
      console.log(err);
    });
};

// call other users - will ask other users to if they like to call or not
// calleeDetails - get from active users list
export const callToOtherUser = (calleeDetails) => {
  console.log("calleeDetails: ", calleeDetails);
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));

  //wss socket.emit. pre_offer
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().auth.username,
    },
  });
};

//////////////////////create peer connection////////////////////////
const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);

  const localStream = store.getState().call.localStream;

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    // dispatch remote stream to store
    // store.dispatch(setRemoteStream(stream));
    store.dispatch(setRemoteStream(stream));
  };

  peerConnection.onicecandidate = (event) => {
    console.log("getting candidates from stun server");
    //send ice candidates to other peer
    if (event.candidate) {
      wss.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId,
      });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === "connected") {
      console.log("successfully connected with other peer");
    }
  };
};

/////////////////////////////////////////////////////////////////////

export const handlePreOffer = (data) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};

export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  });
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  });

  resetCallData();
};

export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogVisible(false));

  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    //send webRTC offer
    sendOffer();
  } else {
    let rejectionReason;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = "User is not available";
    } else {
      rejectionReason = "User rejected your call request";
    }
    store.dispatch(
      setCallRejected({
        rejected: true,
        reason: rejectionReason,
      })
    );
    resetCallData();
  }
};

// creating webRTC offer
const sendOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer,
  });
};

// handle webRTC offer
export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer,
  });
};

// handle webRTC answer
export const handleAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
};

// handle webRTC ice candidates
export const handleCandidate = async (data) => {
  try {
    console.log("adding ice candidates ", data.candidate);
    await peerConnection.addIceCandidate(data.candidate);
  } catch (error) {
    console.error("Error adding received ice candidate: ", error);
  }
};

// handle pre offer answer
export const checkIfCallIsPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE
  ) {
    return false;
  } else {
    return true;
  }
};

// screen share
let screenShareStream;

export const switchForScreenSharingStream = async () => {
  if (!store.getState().call.screenSharingActive) {
    try {
      screenShareStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      store.dispatch(setScreenSharingActive(true));
      const senders = peerConnection.getSenders();
      const sender = senders.find(
        (sender) =>
          sender.track.kind === screenShareStream.getVideoTracks()[0].kind
      );
      sender.replaceTrack(screenShareStream.getVideoTracks()[0]);
    } catch (error) {
      console.log("Error switching for screen sharing stream: ", error);
    }
  } else {
    const localStream = store.getState().call.localStream;
    const senders = peerConnection.getSenders();
    const sender = senders.find(
      (sender) => sender.track.kind === localStream.getVideoTracks()[0].kind
    );
    sender.replaceTrack(localStream.getVideoTracks()[0]);
    store.dispatch(setScreenSharingActive(false));
    screenShareStream.getTracks().forEach((track) => track.stop());
  }
};

// hang up
export const handleUserHangedUp = () => {
  resetCallDataAfterHangUp();
};

export const hangUp = () => {
  wss.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId,
  });
  resetCallDataAfterHangUp();
};

const resetCallDataAfterHangUp = () => {
  if (store.getState().call.screenSharingActive) {
    screenShareStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  store.dispatch(resetCallDataState());
  peerConnection.close();
  peerConnection = null;
  createPeerConnection();
  resetCallData();

  const localStream = store.getState().call.localStream;

  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};
export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
