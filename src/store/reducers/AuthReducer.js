const initialState = {
  username: "",
  activeUsers: [],
  groupCallRooms: [],
};

const userReducer = (state = initialState, action) => {
  console.log("userReducer: ", action);
  switch (action.type) {
    case "SET_SAVE_USER":
      return {
        ...state,
        username: action.payload.username,
      };
    case "SET_ACTIVE_USERS":
      return {
        ...state,
        activeUsers: action.payload.activeUsers,
      };
    case "SET_GROUP_CALL_ROOMS":
      return {
        ...state,
        groupCallRooms: action.payload.groupCallRooms,
      };
    default:
      return state;
  }
};

export default userReducer;
