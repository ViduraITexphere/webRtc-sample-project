import sockeClient from "socket.io-client";
import store from "../../store/Store";
import * as AuthActions from "../../store/actions/AuthAction";
import * as webRTChandler from "../webRTC/webRTChandler";
import * as webRTCGroupCallHandler from "../webRTC/webRTCGroupCallHandler";

const SERVER = "http://localhost:5000";

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

let socket;

export const connectWithWebSocket = () => {
  socket = sockeClient(SERVER);
  socket.on("connection", () => {
    console.log("Connected to server");
    console.log("socket.id: ", socket.id);
  });

  socket.on("broadcast", (data) => {
    handleBroadcastEventData(data);
    console.log("broadcast: ", data);
  });

  //listen for pre offer
  //listeners related with direct call
  socket.on("pre_offer", (data) => {
    webRTChandler.handlePreOffer(data);
  });

  //listen for pre answer
  socket.on("pre_offer_answer", (data) => {
    webRTChandler.handlePreOfferAnswer(data);
  });

  //listen for webRTC offer
  socket.on("webRTC_offer", (data) => {
    webRTChandler.handleOffer(data);
  });

  //listen for webRTC answer
  socket.on("webRTC_answer", (data) => {
    webRTChandler.handleAnswer(data);
  });

  //listen for webRTC candidate
  socket.on("webRTC_candidate", (data) => {
    webRTChandler.handleCandidate(data);
  });

  //listen for user hanged up
  socket.on("user_hanged_up", () => {
    webRTChandler.handleUserHangedUp();
  });

  //listeners related with group call
  socket.on("group_call_join_request", (data) => {
    webRTCGroupCallHandler.connectToNewUser(data);
  });

  socket.on("group_call_user_left", (data) => {
    webRTCGroupCallHandler.removeInactiveStream(data);
  });
};

export const registerNewUser = (username) => {
  console.log("socket ::: ", socket.id);
  socket.emit("register_new_user", {
    username: username,
    socketId: socket.id,
  });
};

const handleBroadcastEventData = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers = data.activeUsers.filter(
        (activeUsers) => activeUsers.socketId !== socket.id
      );
      store.dispatch(AuthActions.setActiveUsers(activeUsers));
      break;
    case broadcastEventTypes.GROUP_CALL_ROOMS:
      const groupCallRooms = data.groupCallRooms.filter(
        (room) => room.socketId !== socket.id
      );
      const activeGroupCallRoomId =
        webRTCGroupCallHandler.checkActiveGroupCall();
      if (activeGroupCallRoomId) {
        const room = groupCallRooms.find(
          (room) => room.roomId === activeGroupCallRoomId
        );

        if (!room) {
          webRTCGroupCallHandler.clearGroupData();
        }
      }

      store.dispatch(AuthActions.setGroupCalls(groupCallRooms));
      break;
    default:
      break;
  }
};

// send pre offer to other user
// emmit pre_offer event to signaling server
export const sendPreOffer = (data) => {
  socket.emit("pre_offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socket.emit("pre_offer_answer", data);
};

// send webRTC offer to other user
export const sendWebRTCOffer = (data) => {
  socket.emit("webRTC_offer", data);
};

// send webRTC answer to other user
export const sendWebRTCAnswer = (data) => {
  socket.emit("webRTC_answer", data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit("webRTC_candidate", data);
};

// send user hanged up to other user
export const sendUserHangedUp = (data) => {
  socket.emit("user_hanged_up", data);
};

//emit group call room event to signaling server
export const registerGroupCall = (data) => {
  socket.emit("group_call_register", data);
};

// emit group call join request to signaling server
export const userWantsToJoinGroupCall = (data) => {
  socket.emit("group_call_join_request", data);
};
// emit group call leave request to signaling server
export const userLeftGroupCall = (data) => {
  socket.emit("group_call_user_left", data);
};

// emit group call close request to signaling server
export const groupCallClosedByHost = (data) => {
  socket.emit("group_call_closed_by_host", data);
};
