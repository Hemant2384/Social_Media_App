import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "./NewPassword.css";

const NewPassword = () => {
  const authenticated = localStorage.getItem("reset-token");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/resetPassword/${authenticated}`, {
        password: newPassword,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("reset-token");
        alert("Password reset successfully");
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
    setNewPassword("");
  };

  return (
    <>
      {authenticated ? (
        <>
          <Navigate to="/login" />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="reset">
            <h3 className="reset-head">Enter your New Password</h3>
            <label htmlFor="email">
              New Password:
              <input
                className="input-form"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
};

export default NewPassword;
