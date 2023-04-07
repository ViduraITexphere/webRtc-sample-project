import React from "react";
import GroupCallRoomsListItems from "./GroupCallRoomsListItems";
import { connect } from "react-redux";
import "./GroupCallRoomsList.css";

function GroupCallRoomsList(props) {
  const { groupCallRooms } = props;
  console.log("groupCallList", groupCallRooms);
  return (
    <div>
      {groupCallRooms.map((room) => (
        <GroupCallRoomsListItems key={room.roomId} room={room} />
      ))}
    </div>
  );
}

const mapStoreStateToProps = ({ auth }) => ({
  ...auth,
});

export default connect(mapStoreStateToProps)(GroupCallRoomsList);
