import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Post.css";
import {BsCardImage} from 'react-icons/bs'

const Post = () => {
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
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // console.log(posts);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Image);
    const formData = new FormData();
    formData.append("img", Image);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:8000/post", formData, config)
      .then((res) => {
        alert("Succesfully posted");
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
    setImage("");
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
                  <BsCardImage className="upload-icon"/>
                  {/* <i className="fa fa-upload" aria-hidden="true"></i> */}
                  Upload image
                </label>
              </button>
              <input type="file" id="upload-image" accept="image/*" multiple onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="post-actions__widget">
              <button className="btn post-actions__publish">Post</button>
            </div>
          </div>
        </form>
      <div className="card-container">
        {posts.map((user) => {
          return (
            <div className="containerr">
              <div className="square">
                <h3></h3>
                <img
                  src={`data:image/png;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(user.img.data))
                  )}`}
                  alt=""
                  className="mask"
                />
                <div className="h1">{user.username}</div>
                <p>
                  Apple is more than a tech company; it became a culture unto
                  itself, a passion of most of people and the birthplace of the
                  world’s most revolutionized products.
                </p>
                <div>
                  <a href="/" target="_" className="button">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      </div>
    </>
  );
};

export default Post;
