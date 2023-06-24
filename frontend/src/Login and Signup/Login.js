import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "./Login.css";
import {BarWave, Hypnosis, FillingBottle} from "react-cssfx-loading";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authenticated = localStorage.getItem("user-token");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        console.log("Logged in");
        const token = res.data.token;
        localStorage.clear();
        localStorage.setItem("user-token", token);
        navigate("/home");
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
        <Navigate to='/home'/>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="login">
            <h3 className="login-head">Login</h3>
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
            <h4>
              <Link className="navigate" to="/register">
                Create a new Account ?
              </Link>
            </h4>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
