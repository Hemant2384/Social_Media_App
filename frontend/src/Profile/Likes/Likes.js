import React, { useState, useEffect } from 'react'
import axios from "axios";


const Likes = ({postid}) => {

    const [likes, setLikes] = useState(0)
    console.log(postid);

    // useEffect(() => {
    //     const token = localStorage.getItem("user-token");
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //     console.log(token);
    //     if (token) {
    //       console.log("token");
    //       axios
    //         .get(`http://localhost:8000/like/${postid}`)
    //         .then((res) => {
    //           console.log(res.data);
    //           setLikes(res.data);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }
    //     // const interval = setInterval(() => {
    
    //     // }, 1500);
    //     // return () => clearInterval(interval);
    //   }, []);

    const handleLikes = (e) => {
        e.preventDefault();
        axios
          .post(`http://localhost:8000/like/${postid}`)
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            alert(err);
          });
      };

  return (
    <>
    <h3 onClick={handleLikes}>{likes}  Likes</h3>
    </>
  )
}

export default Likes