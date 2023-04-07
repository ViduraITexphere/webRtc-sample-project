import React from "react";

function GroupCallButton({ onClickHandler, label }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button onClick={onClickHandler}>{label}</button>
    </div>
  );
}

export default GroupCallButton;
