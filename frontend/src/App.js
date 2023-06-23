import './App.css';
import * as React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login and Signup/Login';
import Signup from './Login and Signup/Signup';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Navbar from './Navbar/Navbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
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

function App() {
  return (
    <>
    <Navbar/>
    <RouterProvider router = {router}/>
    </>
  );
}

export default App;
