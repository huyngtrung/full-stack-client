import React from "react";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import axios from "axios";

import { AuthContext } from "../../helpers/AuthContext";

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import config from "../../config";

const cx = classNames.bind(styles);

function Home() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      userName: "",
      id: 0,
      status: false,
    });
  };

  const handleLike = (PostId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: PostId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === PostId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArr = post.Likes;
                likesArr.pop();
                return { ...post, Likes: likesArr };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(PostId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== PostId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, PostId]);
        }
      });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-page")}>
        {!authState.status ? (
          <>
            <button>
              <Link to={config.routes.login}>to login </Link>
            </button>
            <button>
              <Link to={config.routes.register}>to register </Link>
            </button>
          </>
        ) : (
          <>
            <button>
              <Link to={config.routes.about}>to form</Link>
            </button>
            <button>
              <Link to={`/profile/${authState.id}`}>to profile</Link>
            </button>
            <button onClick={handleLogOut}>
              <Link to={config.routes.login}>log out</Link>
            </button>
          </>
        )}
        <div>name:{authState.userName}</div>
      </div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className={cx("post")}>
            <div
              className="title"
              onClick={() => {
                history(`/post/${value.id}`);
              }}
            >
              {value.title}
            </div>
            <div className="body">{value.postText}</div>
            <div className="footer">
              <h1>
                <Link to={`/profile/${value.UserId}`}>{value.userName}</Link>
              </h1>
              <button
                onClick={() => handleLike(value.id)}
                className={
                  likedPosts.includes(value.id) ? cx("like") : cx("unlike")
                }
              >
                like
              </button>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
