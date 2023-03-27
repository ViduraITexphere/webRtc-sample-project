
const initialState = {
    localStream: null

    };

    const callReducer = (state = initialState, action) => {

    switch (action.type) {
        case "CALL_SET_LOCAL_STREAM":
            return {
                ...state,
                localStream: action.payload.localStream
            }
        default:
            return state;
    }
    };

    export default callReducer;
           
