import { callStates } from "../actions/CallAction";

const initialState = {
  localStream: null,
  callState: callStates.CALL_UNVAILABLE,
};

const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CALL_SET_LOCAL_STREAM":
      return {
        ...state,
        localStream: action.payload.localStream,
      };
    case "CALL_SET_CALL_STATE":
      return {
        ...state,
        callState: action.callState,
      };

    default:
      return state;
  }
};

export default callReducer;
