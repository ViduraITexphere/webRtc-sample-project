import { connect } from "react-redux";
import { callStates } from "../../store/actions/CallAction";
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
    callingDialogVisible,
  } = props;

  console.log("callingDialogVisible: ", callingDialogVisible);
  return (
    <div>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <LocalVideoView remoteStream={remoteStream} />}
      {/* <CallRejectedDialog /> */}
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
export default connect(mapStoreStateToProps, null)(DirectCall);
