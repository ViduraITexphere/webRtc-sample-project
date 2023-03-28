import React from "react";
import "./IncomingCallDialog.css";

function IncomingCallDialog({ callerUsername }) {
  const handleAcceptedButtonPressed = () => {
    console.log("accepted");
  };

  const handleRejectedButtonPressed = () => {
    console.log("rejected");
  };

  return (
    <div className="direct_call_dialog">
      <span className="direct_call_dialog_caller_name">
        Incoming Call from {callerUsername}
      </span>
      <div className="direct_call_dialog_button_container">
        <button
          className="direct_call_dialog_accept_button"
          onClick={handleAcceptedButtonPressed}
        >
          Accept
        </button>
        <button
          className="direct_call_dialog_reject_button"
          onClick={handleRejectedButtonPressed}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default IncomingCallDialog;
