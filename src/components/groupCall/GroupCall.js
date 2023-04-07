import React from "react";
import { connect } from "react-redux";
import {
  callStates,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from "../../store/actions/CallAction";
import GroupCallButton from "../groupCallButton/GroupCallButton";
import * as webRTCGroupCallHandler from "../../utils/webRTC/webRTCGroupCallHandler";
import GroupCallRoom from "../groupCallRoom/GroupCallRoom";
import leaveGroupCall from "../../utils/webRTC/webRTCGroupCallHandler";

function GroupCall(props) {
  const { callState, localStream, groupCallActive, groupCallStreams } = props;
  console.log("groupCallActive 1: ", groupCallActive);
  console.log("groupCallActive 2: ", localStream);
  console.log("groupCallActive 3: ", callState);
  console.log("groupCallActive 4: ", groupCallStreams);

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };
  return (
    <div>
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallButton onClickHandler={createRoom} label="Create Room" />
        )}
      {groupCallActive && <GroupCallRoom {...props} />}
      {groupCallActive && (
        <GroupCallButton onClickHandler={leaveRoom} label="Leave Room" />
      )}
    </div>
  );
}

const mapStoreStateToProps = ({ call }) => ({
  ...call,
});

const mapActionToProps = (dispatch) => {
  return {
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) =>
      dispatch(setLocalMicrophoneEnabled(enabled)),
  };
};

export default connect(mapStoreStateToProps, mapActionToProps)(GroupCall);
