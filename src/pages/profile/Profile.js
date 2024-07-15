import React, { useEffect, useState, useContext } from "react";

import styles from "./Profile.module.scss";
import classNames from "classnames/bind";

import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../helpers/AuthContext";

import axios from "axios";

const cx = classNames.bind(styles);

function Profile() {
  let { id } = useParams();
  let history = useNavigate();
  const { authState } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUserName(response.data.userName);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("basic-info")}>
        <h1>{userName}</h1>
        {authState.userName === userName && (
          <button
            onClick={() => {
              history("/changePassWord");
            }}
          >
            change passWord
          </button>
        )}
      </div>
      <div className={cx("list-of-posts")}>
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className={cx("post")}>
              <div className="title">{value.title}</div>
              <div className="body">{value.postText}</div>
              <div className="footer">
                {value.userName}
                <label>like:{value.Likes.length}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
