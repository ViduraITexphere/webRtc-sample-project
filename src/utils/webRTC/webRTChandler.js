import store from "../../store/Store";
import {
  setCallerUsername,
  setCallState,
  callStates,
  setLocalStream,
  setCallingDialogVisible,
} from "../../store/actions/CallAction";
import * as wss from "../wssConnection/wssConnection";

const defaultConstraints = {
  audio: true,
  video: true,
};

//getUserMedia allows web applications to access media devices
//and capture audio and video data from them.
export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      //ask signaling server to whether like to call or not
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch((error) => {
      console.log("Error getting local stream: ", error);
    });
};

let connectedUserSocketId;

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

export const handlePreOffer = (data) => {
  connectedUserSocketId = data.callerSocketId;
  store.dispatch(setCallerUsername(data.callerUsername));
  store.dispatch(setCallState(callStates.CALL_REQUESTED));

};
