import React from "react";
import { connect } from "react-redux";
import ActiveUsersListItem from "./ActiveUserListItems";
import "./ActiveUsers.css";

const ActiveUsers = ({ activeUsers }) => {
  console.log("active user", activeUsers);

  return (
    <div>
      <div className="active-user-list-container">
        <ul className="active-user-list">
          {activeUsers.map((user) => {
            return (
              <li className="active-user-list-item">
                <ActiveUsersListItem activeUser={user} key={user.socketId} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  ...auth,
});
export default connect(mapStateToProps)(ActiveUsers);
