import { connect } from "react-redux";
import {
  callStates,
  setCallRejected,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from "../../store/actions/CallAction";
import "./DirectCall.css";
import CallingDialog from "../callingDialog/CallingDialog";
import CallRejectedDialog from "../callRejectedDialog/CallRejectedDialog";
import IncomingCallDialog from "../incomingCallDialog/IncomingCallDialog";
import LocalVideoView from "../localVideoView/LocalVideoView";
import RemoteVideoView from "../remoteVideoView/RemoteVideoView";
import ConversationButtons from "../conversationButtons/ConversationButtons";
const DirectCall = (props) => {
  console.log("DirectCall: ", props);
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callRejected,
    callingDialogVisible,
    hideCallRejectedDialog,
  } = props;

  console.log("callingDialogVisible: ", callingDialogVisible);
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <RemoteVideoView remoteStream={remoteStream} />
      )}
      {callRejected.rejected && (
        <CallRejectedDialog
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <ConversationButtons {...props} />
      )}
    </>
  );
};

function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) =>
      dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) =>
      dispatch(setLocalMicrophoneEnabled(enabled)),
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
