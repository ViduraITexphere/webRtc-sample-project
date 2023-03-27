import { connect } from "react-redux";
import CallingDialog from "../callingDialog/CallingDialog";
import CallRejectedDialog from "../callRejectedDialog/CallRejectedDialog";
import IncomingCallDialog from "../incomingCallDialog/IncomingCallDialog";
import LocalVideoView from "../localVideoView/LocalVideoView";
import RemoteVideoView from "../remoteVideoView/RemoteVideoView";
const DirectCall = (props) => {
  console.log("DirectCall: ", props);
  const { localStream, remoteStream } = props;
  return (
    <div>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <LocalVideoView remoteStream={remoteStream} />}
      <CallRejectedDialog />
      <IncomingCallDialog />
      {/* <CallingDialog /> */}
    </div>
  );
};

function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}
export default connect(mapStoreStateToProps, null)(DirectCall);
