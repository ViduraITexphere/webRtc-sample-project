import React, { useEffect } from "react";
import "./CallRejectedDialog.css";

function CallRejectedDialog({ reason, hideCallRejectedDialog }) {
  useEffect(() => {
    setTimeout(() => {
      hideCallRejectedDialog({
        rejected: false,
        reason: "",
      });
    }, [4000]);
  }, []);

  return (
    <div>
      <div className="call_rejected_dialog">
        <span>Call Rejected {reason} </span>
      </div>
    </div>
  );
}

export default CallRejectedDialog;
