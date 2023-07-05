import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from '../Navbar/Navbar'

const Feed = () => {

  const [posts, setPosts] = useState([]);
  const mapping = {}

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (token) {
      axios
        .get("http://localhost:8000/feed")
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
          res.data.map(index => {
            mapping[index._id] = index.likes
          })
          console.log(mapping);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // const interval = setInterval(() => {

    // }, 1500);
    // return () => clearInterval(interval);
  }, []);

  const handleLikes = (id) => {
    console.log(id);
    console.log("mapping", mapping);
      axios
        .post(`http://localhost:8000/like/${id}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          alert(err);
        });
    };

  return (
    <>
    <Navbar/>
    <div className="card-container">
          {posts.length > 0 &&
            posts.map((user, id) => {
              return (
                <div className="containerr" key={id}>
                  <div className="post-header">
                    <h3>{user.username}</h3>
                    <h4 className="post-date">
                      {moment(user.createdAt).fromNow()}
                    </h4>
                  </div>
                  {user.img && user.img.length && (
                    <>
                      <img
                        src={`data:image/jpeg;base64,${btoa(
                          String.fromCharCode.apply(
                            null,
                            new Uint8Array(user.img.data)
                          )
                        )}`}
                        className="mask"
                      />
                    </>
                  )}
                  <p>{user.caption}</p>
                  <div class="likes-comments">
                    <div class="likes">
                    <h3 onClick={() => handleLikes(user._id)}>{mapping[user._id] > 0 && mapping[user._id].length}  Likes</h3>
                    </div>
                    <div class="comments">
                      <h3>Comments</h3>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
    </>
  )
}

export default Feed