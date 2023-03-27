const initialState = {
    username: '',
    activeUsers: []
  };
  
  const userReducer = (state = initialState, action) => {
    console.log ("userReducer: ", action);
    switch (action.type) {
      case "SAVE_USER":
        return {
          ...state,
          username: action.payload.username,
        }
        case "ACTIVE_USERS":
            return {
                ...state,
                activeUsers: action.payload.activeUsers
            }
      default:
        return state;
    }
  };
  
  export default userReducer;
  