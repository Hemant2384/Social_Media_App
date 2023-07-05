import {React, useState} from 'react'
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import './ResetPassword.css'

const ResetPassword = () => {
 
    const authenticated = localStorage.getItem("user-token");

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:8000/resetPassword", {
            email: email,
          })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("reset-token", res.data)
            alert('Reset Link send successfully')
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
              <form onSubmit={handleSubmit} className="reset">
                <h3 className="reset-head">Reset your Password</h3>
                <label htmlFor="email">
                  Email:
                  <input
                   className="input-form"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <button className="reset-button" type="submit">
                  Reset
                </button>
              </form>
            </>
          )}
        </>
      );
}

export default ResetPassword