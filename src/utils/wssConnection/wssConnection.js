import sockeClient from "socket.io-client";
import store from "../../store/Store";
import * as AuthActions from "../../store/actions/AuthAction";
import * as webRTChandler from "../webRTC/webRTChandler";

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
    default:
      break;
  }
};

// send pre offer to other user
// emmit pre_offer event to signaling server
export const sendPreOffer = (data) => {
  socket.emit("pre_offer", data);
};
