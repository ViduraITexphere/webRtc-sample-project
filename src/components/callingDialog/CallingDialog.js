import React from "react";
import { MdCallEnd } from "react-icons/md";
import { hangUp } from "../../utils/webRTC/webRTChandler";
import "./CallingDialog.css";

const styles = {
  buttonContainer: {
    margintop: "10px",
    width: "40px",
    height: "40px",
    borderradius: "40px",
    border: "2px solid #e6e5e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "20px",
    height: "20px",
    fill: "#e6e5e8",
  },
};

function CallingDialog() {
  const handleHangUpButtonPressed = () => {
    hangUp();
  };
  return (
    <div className="direct_calling_dialog">
      <span>Calling...</span>
      <div style={styles.buttonContainer} onClick={handleHangUpButtonPressed}>
        <MdCallEnd style={styles.icon} />
      </div>
    </div>
  );
}

export default CallingDialog;
