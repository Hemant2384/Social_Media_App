import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Post.css";
import { BsCardImage } from "react-icons/bs";
import moment from "moment";

const Post = () => {
  const [hoveredPost, setHoveredPost] = useState(null);
  const [mapping, setMapping] = useState([]);
  const [Image, setImage] = useState(null);
  const [caption, SetCaption] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (token) {
      axios
        .get("http://localhost:8000/posts")
        .then((res) => {
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
  // console.log(posts);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", Image);
    formData.append("caption", caption);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8000/post", formData, config)
      .then((res) => {
        setPosts([...posts, res.data]);
        alert("Succesfully posted");
      })
      .catch((err) => {
        alert(err);
      });
    setImage("");
    SetCaption("");
  };

  const handleLikes = (id, username) => {
    console.log(id);
    console.log("mapping", mapping[id]);
    axios
      .post(`http://localhost:8000/like/${id}`)
      .then((res) => {
        const updatedMapping = { ...mapping };
        const currentLikes = updatedMapping[id].likes;
        const currentLen = updatedMapping[id].len;
        const userliked = res.data.username
        const likedornot = res.data.liked
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

  return (
    <>
      <div className="post">
        <div className="widget-post" aria-labelledby="post-header-title">
          <div className="widget-post__header">
            <h2 className="widget-post__title" id="post-header-title">
              <i className="fa fa-pencil" aria-hidden="true"></i>
              Write post
            </h2>
          </div>
          <form
            id="widget-form"
            className="widget-post__form"
            name="form"
            aria-label="post widget"
            onSubmit={handleSubmit}
          >
            <div className="widget-post__content">
              <label for="post-content" className="sr-only">
                Share Your Moments!
              </label>
              <textarea
                name="post"
                id="post-content"
                className="widget-post__textarea scroller"
                placeholder="share your moments"
                value={caption}
                onChange={(e) => SetCaption(e.target.value)}
              ></textarea>
            </div>
            <div className="widget-post__actions post--actions">
              <div className="post-actions__attachments">
                <button
                  type="button"
                  className="btn post-actions__upload attachments--btn"
                >
                  <label for="upload-image" className="post-actions__label">
                    <BsCardImage className="upload-icon" />
                    {/* <i className="fa fa-upload" aria-hidden="true"></i> */}
                    Upload image
                  </label>
                </button>
                <input
                  type="file"
                  id="upload-image"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="post-actions__widget">
                <button className="btn post-actions__publish">Post</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-container">
          {posts.length > 0 &&
            posts.map((user, id) => {
              const postLikes = mapping[user._id] && mapping[user._id].likes;
              const isLiked = user._id in mapping && mapping[user._id].len > 0;
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
                  <div class="likes">
                      <div
                        onMouseEnter={() => setHoveredPost(user._id)}
                        onMouseLeave={() => setHoveredPost(null)}
                      >
                        <h3
                          onClick={() => handleLikes(user._id)}
                          style={{
                            backgroundColor: isLiked ? "f2f2f2" : "",
                          }}
                        >
                          {mapping[user._id]?.len} Likes
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
                      <h3>Comments</h3>
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

export default Post;
