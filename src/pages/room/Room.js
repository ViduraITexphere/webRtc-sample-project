import React from "react";
import peer from "simple-peer";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import ActiveUsers from "../../components/activeUsers/ActiveUsers";
import * as webRTChandler from "../../utils/webRTC/webRTChandler";


const socket = io.connect("http://localhost:5000");

function Room() {

  useEffect(() => {
    webRTChandler.getLocalStream();
  }, []);
  
  return (
    <div className="room">
      <div  style={{display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", width: "100%"}}>
        <ActiveUsers />
      </div>
    </div>
  );
}

export default Room;
