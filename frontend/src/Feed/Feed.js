import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "../Navbar/Navbar";
import "./Feed.css";
import UserContext from "../ContextAPI/UserContext";
import { useLocation } from "react-router-dom";

const Feed = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loginValue = searchParams.get("userloggedin") || "";

  const [userloggedin] = useState(loginValue); //fixed value
   // const { userlogged } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({});
  const [isLiked, setIsLiked] = useState({});
  const [hoveredPost, setHoveredPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [mapping, setMapping] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (token) {
      axios
        .get("http://localhost:8000/feed")
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
          const newMapping = res.data.reduce((acc, index) => {
            const keys = Object.keys(index.likes);
            const size = keys.length;
            acc[index._id] = {
              likes: index.likes,
              len: size,
            };
            return acc;
          }, {});
          setMapping(newMapping);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // const interval = setInterval(() => {

    // }, 1500);
    // return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   console.log(mapping);
  // }, [mapping]);

  const handleLikes = (id) => {
    console.log(id);
    axios
      .post(`http://localhost:8000/like/${id}`)
      .then((res) => {
        console.log(res.data);
        const updatedMapping = { ...mapping };
        const currentLikes = updatedMapping[id].likes;
        const currentLen = updatedMapping[id].len;
        const userliked = res.data.username;
        const likedornot = res.data.liked;
        if (likedornot) {
          updatedMapping[id].len = currentLen + 1;
          updatedMapping[id].likes = {
            ...currentLikes,
            [userliked]: likedornot,
          };
        } else {
          updatedMapping[id].len = currentLen - 1;
          updatedMapping[id].likes = {
            ...currentLikes,
            [userliked]: likedornot,
          };
        }
        setMapping(updatedMapping);
      })
      .catch((err) => {
        alert(err);
      });
    setHoveredPost(null);
  };

  const viewComments = (id) => {
    axios
      .get(`http://localhost:8000/${id}/comment`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComments = (id, user) => {
    axios
      .post(`http://localhost:8000/${id}/comment`, {
        text: comment[id],
        username: user,
      })
      .then((res) => {
        console.log(res.data);
        setComments([...comments, res.data]);
        setComment({ ...comment, [id]: "" });
      })
      .catch((err) => {
        console.log(err);
      });
    setComment("");
  };

  return (
    <>
      <Navbar />
      <div className="feed">
        <div className="card-container">
          {posts.length > 0 &&
            posts.map((user, id) => {
              console.log(isLiked);
              const postLikes = mapping[user._id] && mapping[user._id].likes;
              const likesList = Object.keys(postLikes || {}).filter(
                (key) => postLikes[key]
              );
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
                    <div
                      class="likes_feed"
                      style={{
                        backgroundColor: isLiked[user._id] ? "f2f2f2" : "white",
                      }}
                    >
                      <div
                        onMouseEnter={() => setHoveredPost(user._id)}
                        onMouseLeave={() => setHoveredPost(null)}
                      >
                        <h3 onClick={() => handleLikes(user._id)}>
                          {mapping[user._id].len} Likes
                        </h3>
                        {hoveredPost === user._id && (
                          <div className="likes-dropdown">
                            {likesList.map((likedUser, index) => (
                              <p key={index}>{likedUser}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="comments">
                      <h3 onClick={() => viewComments(user._id)}>Comments</h3>
                    </div>
                  </div>
                  <div className="comments-section" key={id}>
                  <input
                          type="text"
                          value={comment[user._id] || ""}
                          onChange={(e) =>
                            setComment({
                              ...comment,
                              [user._id]: e.target.value,
                            })
                          }
                        />
                        <button
                          type="submit"
                          onClick={() => handleComments(user._id, userloggedin)}
                        >
                          Post
                        </button>
                    {/* {user.username === userloggedin && (
                      <>
                        
                      </>
                    )} */}
                    <div className="comments_feed">
                      {comments.map((com) => {
                        return (
                          com.post_id === user._id && (
                            <>
                              <h4 className="comment_username">{com.username}</h4>
                              <h4 className="comment_date"> {moment(com.createdAt).fromNow()}</h4>
                              <div className="comment_text">{com.text}</div>
                            </>
                          )
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Feed;
