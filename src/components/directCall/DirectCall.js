import { connect } from "react-redux";
import { callStates, setCallRejected } from "../../store/actions/CallAction";
import CallingDialog from "../callingDialog/CallingDialog";
import CallRejectedDialog from "../callRejectedDialog/CallRejectedDialog";
import IncomingCallDialog from "../incomingCallDialog/IncomingCallDialog";
import LocalVideoView from "../localVideoView/LocalVideoView";
import RemoteVideoView from "../remoteVideoView/RemoteVideoView";
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
    <div>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
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
    </div>
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
  };
}
export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
