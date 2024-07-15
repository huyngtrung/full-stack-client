import React from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../helpers/AuthContext";

import styles from "./Post.module.scss";
import classNames from "classnames/bind";

import axios from "axios";

import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const cx = classNames.bind(styles);

function Post() {
  const history = useNavigate();
  const { authState } = useContext(AuthContext);

  let { id } = useParams();
  const [postObj, setPostObj] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((respone) => {
      setPostObj(respone.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((respone) => {
      setComments(respone.data);
    });
  }, []);

  const handleAddComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: commentInput,
          PostId: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((respone) => {
        if (respone.data.error) {
          alert(respone.data.error);
          console.log(respone.data.error);
        } else {
          const commentToAdd = {
            commentBody: commentInput,
            userName: respone.data.userName,
          };
          setComments((prevComments) => [...prevComments, commentToAdd]);
          setCommentInput("");
        }
      });
  };

  const handleCommentInput = (event) => {
    setCommentInput(event.target.value);
  };

  const handleDeleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id !== id;
          })
        );
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const handleDeletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history("/");
      });
  };

  const handleEditPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter New Title:");
      axios.put(
        "http://localhost:3001/posts/title",
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setPostObj({ ...postObj, title: newTitle });
    } else {
      let newPostText = prompt("Enter New Post Text:");
      axios.put(
        "http://localhost:3001/posts/postText",
        {
          newPostText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setPostObj({ ...postObj, postText: newPostText });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("left-side")}>
        <div
          onClick={() => {
            if (authState.userName === postObj.userName) {
              handleEditPost("title");
            }
          }}
        >
          {postObj.title}{" "}
        </div>
        <div
          onClick={() => {
            if (authState.userName === postObj.userName) {
              handleEditPost("body");
            }
          }}
        >
          {postObj.postText}
        </div>
        <div>{postObj.userName}</div>
        {authState.userName === postObj.userName && (
          <button onClick={() => handleDeletePost(postObj.id)}>delete</button>
        )}
      </div>
      <div className={cx("right-side")}>
        <div className={cx("add-comment")}>
          <input
            type="text"
            placeholder="comment..."
            autoComplete="off"
            value={commentInput}
            onChange={(event) => handleCommentInput(event)}
          />
          <button onClick={handleAddComment}>add comment</button>
        </div>
        <div className={cx("list-comment")}>
          {comments.map((comment, key) => {
            return (
              <div className={cx("comment")} key={key}>
                <h4>{comment.commentBody}</h4>
                <p>{comment.userName}</p>
                {authState.userName === comment.userName && (
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
