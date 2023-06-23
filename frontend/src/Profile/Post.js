import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Post.css'

const Post = () => {

  const [Image, setImage] = useState(null);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (token) {
      axios.get('http://localhost:8000/posts').then(res => {
        console.log(res.data);
        setPosts(res.data)
      }).catch((err => {
        console.log(err);
      }))
    }
  }, [])

  // console.log(posts);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Image);
    const formData = new FormData();
    formData.append('img', Image);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios
      .post("http://localhost:8000/post", formData, config)
      .then((res) => {
        alert("Succesfully posted");
        console.log(res.data)
      })
      .catch((err) => {
        alert(err);
      });
    setImage("");
  };
  return (
    <div className='main'>
      <form onSubmit={handleSubmit} className="post">
        <h3>Create Post</h3>
        <label htmlFor="image">
          <input
            type="file"
            // value={Image}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button type="submit">Post</button>
      </form>
      <div className='card-container'>
        {
          posts.map((user) => {
            return (
              <div className="containerr">
                <div className="square">
                  <h3></h3>
                  <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(user.img.data)))}`} alt=""  className='mask'/>
                    <div class="h1">{user.username}</div>
                    <p>Apple is more than a tech company; it became a culture unto itself, a passion of most of people and the birthplace of the world’s most revolutionized products.</p>
                    <div><a href="/" target="_" class="button">Read More</a></div>
                </div>
              </div>
              // <div className='posts'>
              //   <div className='card-img'>
              //   <img className='card-link' src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(user.img.data)))}`} alt="" />
              //   </div>
              //   <h1>{user.username}</h1>

              // </div>
      )
          })
        }
    </div>
    </div >
  )
}

export default Post