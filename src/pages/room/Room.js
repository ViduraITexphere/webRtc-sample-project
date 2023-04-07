import React from "react";
import { useEffect, useRef, useState } from "react";
import ActiveUsers from "../../components/activeUsers/ActiveUsers";
import * as webRTChandler from "../../utils/webRTC/webRTChandler";
import DirectCall from "../../components/directCall/DirectCall";
import * as webRTCGroupCallHandler from "../../utils/webRTC/webRTCGroupCallHandler";
import GroupCallRoomsList from "../../components/groupCallRoomsList/GroupCallRoomsList";
import GroupCall from "../../components/groupCall/GroupCall";
import { connect } from "react-redux";

function Room() {
  useEffect(() => {
    webRTChandler.getLocalStream();
    webRTCGroupCallHandler.connectWithMyPeer();
  }, []);

  return (
    <div className="room">
      <div className="room__header">
        <DirectCall />
        <GroupCall />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          marginbottom: "10px",
        }}
      >
        <ActiveUsers />
      </div>
      <GroupCallRoomsList />
    </div>
  );
}

const mapStateToProps = ({ call, auth }) => ({
  ...call,
  ...auth,
});

export default connect(mapStateToProps)(Room);
