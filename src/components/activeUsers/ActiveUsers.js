import React from "react";
import { connect } from "react-redux";
import ActiveUsersListItem from "./ActiveUserListItems";
import "./ActiveUsers.css";

const ActiveUsers = ({ activeUsers, callState }) => {
  console.log("active user", activeUsers);

  return (
    <div>
      <div className="active-user-list-container">
        <ul className="active-user-list">
          {activeUsers.map((user) => {
            return (
              <li className="active-user-list-item">
                <ActiveUsersListItem
                  activeUser={user}
                  callState={callState}
                  key={user.socketId}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, call }) => ({
  ...auth,
  ...call,
});
export default connect(mapStateToProps)(ActiveUsers);
