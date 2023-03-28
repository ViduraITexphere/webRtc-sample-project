const express = require("express");
const mongoose = require("mongoose");
//7-Import body-parser library
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const RoomRoutes = require("./routes/CreateRoom");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let peers = [];

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

    socket.on("disconnect", () => {
      console.log("disconnect: ", socket.id);
      peers = peers.filter((peer) => peer.socketId !== socket.id);
      io.sockets.emit("broadcast", {
        event: broadcastEventTypes.ACTIVE_USERS,
        activeUsers: peers,
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
