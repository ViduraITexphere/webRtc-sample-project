import React, { useRef, useEffect } from "react";

const styles = {
  videoContainer: {
    width: "220px",
    height: "160px",
    position: "absolute",
    top: "2%",
    left: "2%",
    border: "1px solid blue",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: "2",
  },
  videoElement: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

function LocalVideoView(props) {
  const { localStream } = props;
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      // console.log("localStream: ", localStream);
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);
  return (
    <div style={styles.videoContainer} className="local-video-view">
      <video
        style={styles.videoElement}
        ref={localVideoRef}
        autoPlay
        muted
      ></video>
    </div>
  );
}

export default LocalVideoView;
