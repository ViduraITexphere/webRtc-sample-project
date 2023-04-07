import React from "react";
import { callStates } from "../../store/actions/CallAction";
import { callToOtherUser } from "../../utils/webRTC/webRTChandler";

const ActiveUsersListItem = (props) => {
  const { activeUser, callState } = props;
  console.log("activeUser: ", activeUser);

  const handleListItemPressed = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
    }
  };

  console.log(activeUser);

  return (
    <div className="active_user_list_item" onClick={handleListItemPressed}>
      <div className="active_user_list_image_container"></div>
      <span className="active_user_list_text">{activeUser.username}</span>
    </div>
  );
};

export default ActiveUsersListItem;
