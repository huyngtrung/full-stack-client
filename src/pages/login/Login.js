import React, { useState, useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";

import styles from "./Login.module.scss";
import classNames from "classnames/bind";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const cx = classNames.bind(styles);

function Login() {
  let history = useNavigate();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const handleUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  const handlePassWordInput = (event) => {
    setPassWord(event.target.value);
  };

  const handleLogin = () => {
    const data = { userName: userName, passWord: passWord };
    axios.post("http://localhost:3001/auth/login", data).then((respone) => {
      if (respone.data.error) {
        alert(respone.data.error);
      } else {
        localStorage.setItem("accessToken", respone.data.token);
        setAuthState({
          userName: respone.data.userName,
          id: respone.data.id,
          status: true,
        });
        history("/");
      }
    });
  };

  return (
    <div className={cx("wrapper")}>
      <p>user name</p>
      <input
        type="text"
        value={userName}
        onChange={(event) => handleUserNameInput(event)}
      />
      <p>passWord</p>
      <input
        type="password"
        value={passWord}
        onChange={(event) => handlePassWordInput(event)}
      />
      <button onClick={handleLogin}>login</button>
    </div>
  );
}

export default Login;
