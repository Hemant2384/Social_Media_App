import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logout from "./Logout";
import './Login.css'

const Login = () => {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authenticated = localStorage.getItem('user-token') || "";
  
  const handleSubmit = (e) => {
    console.log(username);
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        alert("Logged in");
        const token = res.data.token;
        localStorage.clear();
        localStorage.setItem("user-token", token);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      {authenticated ? (
        <>
          <Logout />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="login">
            <h3>Login</h3>
            <label htmlFor="username">
              Username:
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <h4><Link to='/register'>Create a new Account ?</Link></h4>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
