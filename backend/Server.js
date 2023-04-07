const express = require("express");
const mongoose = require("mongoose");
//7-Import body-parser library
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const RoomRoutes = require("./routes/CreateRoom");
const http = require("http");
const server = http.createServer(app);
const { ExpressPeerServer } = require("peer");
const GroupCallHandler = require("./GroupCallHandler");
const { v4: uuidV4 } = require("uuid");

////////////////// create a peer server////////////////
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
//////////////////////////////////////////////////////
app.use("/peerjs", peerServer); //mount a PeerJS server middleware onto an Express application.

////////////////////Listner for the peer server/////////////////
GroupCallHandler.createPeerServerListners(peerServer);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let peers = [];
let groupCallRooms = [];

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

//create socket connection
io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);
  socket.emit("connection", null);

  socket.on("register_new_user", (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId,
    });
    console.log("register_new_user: ");
    console.log("peers: ", peers);

    //send active users to all users
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });
    //send group call rooms to all users
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });

    socket.on("disconnect", () => {
      console.log("disconnect: ", socket.id);
      peers = peers.filter((peer) => peer.socketId !== socket.id);
      io.sockets.emit("broadcast", {
        event: broadcastEventTypes.ACTIVE_USERS,
        activeUsers: peers,
      });

      groupCallRooms = groupCallRooms.filter(
        (room) => room.socketId !== socket.id
      );
      io.sockets.emit("broadcast", {
        event: broadcastEventTypes.GROUP_CALL_ROOMS,
        groupCallRooms,
      });
    });

    // listen for pre offer
    // listeners related with direct call
    socket.on("pre_offer", (data) => {
      console.log("pre_offer: ", data);
      io.to(data.callee.socketId).emit("pre_offer", {
        callerUsername: data.caller.username,
        callerSocketId: socket.id,
      });
    });

    //listen for pre answer
    socket.on("pre_offer_answer", (data) => {
      console.log("pre_offer_answer: ", data);
      io.to(data.callerSocketId).emit("pre_offer_answer", {
        answer: data.answer,
      });
    });

    //listen for webRTC offer
    socket.on("webRTC_offer", (data) => {
      console.log("webRTC_offer: ", data);
      io.to(data.calleeSocketId).emit("webRTC_offer", {
        offer: data.offer,
      });
    });

    //listen for webRTC answer
    socket.on("webRTC_answer", (data) => {
      console.log("webRTC_answer: ", data);
      io.to(data.callerSocketId).emit("webRTC_answer", {
        answer: data.answer,
      });
    });

    //listen for new ice candidate
    socket.on("webRTC_candidate", (data) => {
      console.log("new_ice_candidate: ", data);
      io.to(data.connectedUserSocketId).emit("webRTC_candidate", {
        candidate: data.candidate,
      });
    });

    //listen for hang up
    socket.on("user_hanged_up", (data) => {
      console.log("user_hanged_up: ", data);
      io.to(data.connectedUserSocketId).emit("user_hanged_up");
    });
  });

  // listeners related with group call
  socket.on("group_call_register", (data) => {
    const roomId = uuidV4();
    socket.join(roomId);

    const newGroupCallRoom = {
      peerId: data.peerId,
      hostName: data.username,
      socketId: socket.id,
      roomId: roomId,
    };
    groupCallRooms.push(newGroupCallRoom);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });
  socket.on("group_call_join_request", (data) => {
    io.to(data.roomId).emit("group_call_join_request", {
      peerId: data.peerId,
      streamId: data.streamId,
    });
    socket.join(data.roomId);
  });

  socket.on("group_call_user_left", (data) => {
    socket.leave(data.roomId);
    io.to(data.roomId).emit("group_call_user_left", {
      streamId: data.streamId,
    });
  });

  socket.on("group_call_closed_by_host", (data) => {
    groupCallRooms = groupCallRooms.filter(
      (room) => room.peerId !== data.peerId
    );
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });
});
//8-app middleware
app.use(bodyParser.json());
app.use(cors());

//9-Route middleware
app.use(RoomRoutes);

//5-Database connection
const DB_URL =
  "mongodb+srv://viduraitexphere:mypass123@web-rtc-app.10ydvu6.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
server.listen(5000, () => console.log(`server is running on port ${PORT}`));
