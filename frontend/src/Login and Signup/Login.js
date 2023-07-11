import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "./Login.css";
// import Cookies from 'js-cookie'
import jwt from 'jwt-decode'
import {BarWave, Hypnosis, FillingBottle} from "react-cssfx-loading";
import UserContext from "../ContextAPI/UserContext";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authenticated = localStorage.getItem("user-token");
  // const jwt_token = Cookies.get('jwt-token')

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
        // const decoded = jwt(token)
        localStorage.clear();
        localStorage.setItem("user-token", token);
        // Cookies.set('jwt-token', token, {
        //   path: '/',
        //   expires: new Date(decoded.exp * 1000),
        //   httpOnly: true,
        //   secure: true,
        // });
        navigate("/feed?userloggedin=" + res.data.user.username);
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
        <Navigate to='/feed'/>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="login">
            <h3 className="login-head">Login</h3>
            <label htmlFor="username">
              Username:
              <input
               className="input-form"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                className="input-form"
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
            <h4>
              <Link className="navigate" to="/forgot">
                Forgot Password ?
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
