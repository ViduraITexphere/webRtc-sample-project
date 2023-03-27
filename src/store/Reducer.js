import { combineReducers } from "redux";
import AuthReducer from "./reducers/AuthReducer";
import CallReducer from "./reducers/CallReducer";

export default combineReducers({
    auth: AuthReducer,
    call: CallReducer,
});
