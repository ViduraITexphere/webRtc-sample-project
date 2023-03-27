import React from "react";
import { useEffect, useRef, useState } from "react";
import ActiveUsers from "../../components/activeUsers/ActiveUsers";
import * as webRTChandler from "../../utils/webRTC/webRTChandler";
import DirectCall from "../../components/directCall/DirectCall";

function Room() {
  useEffect(() => {
    webRTChandler.getLocalStream();
  }, []);

  return (
    <div className="room">
      <div className="room__header">
        <DirectCall />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ActiveUsers />
      </div>
    </div>
  );
}

export default Room;
