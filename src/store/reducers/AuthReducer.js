const initialState = {
    username: '',
  };
  
  const userReducer = (state = initialState, action) => {
    console.log ("userReducer: ", action);
    switch (action.type) {
      case "SAVE_USER":
        return {
          ...state,
          username: action.payload.username,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  