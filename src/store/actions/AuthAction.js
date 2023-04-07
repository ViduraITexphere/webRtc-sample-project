export const SET_SAVE_USER = "SET_SAVE_USER";
export const SET_ACTIVE_USERS = "SET_ACTIVE_USERS";
export const SET_GROUP_CALL_ROOMS = "SET_GROUP_CALL_ROOMS";

export const saveUser = (username) => {
  return {
    type: SET_SAVE_USER,
    payload: {
      username: username,
    },
  };
};

export const setActiveUsers = (activeUsers) => {
  return {
    type: SET_ACTIVE_USERS,
    payload: {
      activeUsers: activeUsers,
    },
  };
};

export const setGroupCalls = (groupCallRooms) => {
  return {
    type: SET_GROUP_CALL_ROOMS,
    payload: {
      groupCallRooms: groupCallRooms,
    },
  };
};
