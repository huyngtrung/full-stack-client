import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./ChangePassWord.module.scss";

import axios from "axios";

const cx = classNames.bind(styles);

function ChangePassWord() {
  const [oldPassWord, setOldPassWord] = useState("");
  const [newPassWord, setNewPassWord] = useState("");

  const handleOldPassWord = (event) => {
    setOldPassWord(event.target.value);
  };

  const handleNewPassWord = (event) => {
    setNewPassWord(event.target.value);
  };

  console.log(oldPassWord);
  console.log(newPassWord);

  const handleChangePassWord = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassWord: oldPassWord,
          newPassWord: newPassWord,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((respone) => {
        if (respone.data.error) {
          alert(respone.data.error);
        }
      });
  };

  return (
    <div>
      <h1>change Your passWord</h1>
      <input
        onChange={(event) => handleOldPassWord(event)}
        type="text"
        placeholder="curr pass..."
      />
      <input
        onChange={(event) => handleNewPassWord(event)}
        type="text"
        placeholder="new pass..."
      />
      <button onClick={handleChangePassWord}>save changes</button>
    </div>
  );
}

export default ChangePassWord;
