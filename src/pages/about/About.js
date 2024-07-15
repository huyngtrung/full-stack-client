import React from "react";
import { useEffect, useContext } from "react";

import { AuthContext } from "../../helpers/AuthContext";

import styles from "./About.module.scss";
import classNames from "classnames/bind";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const cx = classNames.bind(styles);

function About() {
  const { authState, setAuthState } = useContext(AuthContext);
  const initialValues = {
    title: "",
    postText: "",
  };
  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });

  const handleOnSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        history("/");
      });
  };

  return (
    <div className={cx("wrapper")}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            className={cx("input-create-post")}
            name="title"
            placeholder="your title"
          />
          <label>post:</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            className={cx("input-create-post")}
            name="postText"
            placeholder="your post"
          />
          <button type="submit">create post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default About;
