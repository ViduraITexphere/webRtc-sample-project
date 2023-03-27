import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { saveUser } from "../../store/actions/AuthAction";
import { useNavigate } from 'react-router-dom';
import { connectWithWebSocket, registerNewUser } from "../../utils/wssConnection/wssConnection";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    registerNewUser(username);
    console.log("handleSubmit: ", username);
    dispatch(saveUser(username));
    navigate('/room');
  };

  useEffect(() => {
    connectWithWebSocket();
    }, []);

  return (

    <div className="login-form">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
      </div>
      <button type="submit" className="btn" onClick={() => handleSubmit()}>Login</button>
    </div>
  );
}

export default Login;
