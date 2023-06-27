import {React, useState} from 'react'
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";

const ResetPassword = () => {

    const navigate = useNavigate();
    const authenticated = localStorage.getItem("user-token");
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:8000/resetPassword", {
            email: email,
          })
          .then((res) => {
            alert(res)
            navigate("/");
          })
          .catch((err) => {
            alert(err);
          });
        setEmail("");
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
                <label htmlFor="email">
                  Email:
                  <input
                   className="input-form"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <button className="login-button" type="submit">
                  Reset
                </button>
              </form>
            </>
          )}
        </>
      );
}

export default ResetPassword