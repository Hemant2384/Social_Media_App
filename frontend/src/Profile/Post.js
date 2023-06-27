import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Post.css";
import { BsCardImage } from "react-icons/bs";
import moment from "moment";

const Post = () => {
  const [Image, setImage] = useState(null);
  const [caption, SetCaption] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log(token);
    if (token) {
      console.log("token");
      axios
        .get("http://localhost:8000/posts")
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
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
              return (
                <div className="containerr" key={id}>
                  <div className="post-header">
                    <h3>{user.username}</h3>
                    <h4 className="post-date">
                      {moment(user.createdAt).fromNow()}
                    </h4>
                  </div>
                  {user.img.length && (
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
                      <h3>Likes</h3>
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
