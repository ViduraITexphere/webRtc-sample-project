import React, { useRef, useEffect } from "react";
import "./RemoteVideoView.css";

const styles = {
  videoContainer: {
    width: "100%",
    height: "100vh",
    position: "absolute",
    zIndex: "0",
  },
  videoElement: {
    width: "100%",
    height: window.innerHeight - 5,
    objectFit: "cover",
  },
};

function RemoteVideoView(props) {
  const { remoteStream } = props;
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);
  return (
    <div style={styles.videoContainer}>
      <video
        style={styles.videoElement}
        ref={remoteVideoRef}
        autoPlay
        muted
      ></video>
    </div>
  );
}

export default RemoteVideoView;
