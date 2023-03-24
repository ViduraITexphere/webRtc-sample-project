import logo from './logo.svg';
import { RouterProvider } from "react-router-dom";
import './App.css';
import MainRoutes from './routes/MainRoutes';
import { Provider } from 'react-redux';
import store from './store/Store';

function App() {
  return (
  //  <RoomAccess />
  <Provider store={store}>
  <RouterProvider router= {MainRoutes} />
  </Provider>
  );
}

export default App;
