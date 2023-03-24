// import {createStore} from 'redux';
// import mainReducer from './Reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(mainReducer, composeWithDevTools());

// export default store;

// reducers/index.js

import {createStore} from 'redux';
import mainReducer from './Reducer';

const store = createStore(mainReducer);
export default store;


// index.js

// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./Reducer";

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
