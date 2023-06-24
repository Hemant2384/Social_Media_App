import './App.css';
import * as React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login and Signup/Login';
import Signup from './Login and Signup/Signup';
import Home from './Home/Home';
import Profile from './Profile/Profile';

function App() {
  
  // const loggedin = localStorage.getItem('user-token');
  
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Signup/>
    },
    {
      path: "/profile",
      element: <Profile/>
    }
  ]);
  
  return (
    <>
    <RouterProvider router = {router}/>
    </>
  );
}

export default App;
