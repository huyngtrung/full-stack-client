import React from "react";

import styles from "./Register.module.scss";
import classNames from "classnames/bind";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const cx = classNames.bind(styles);

function Register() {
  const initialValues = {
    userName: "",
    passWord: "",
  };
  let history = useNavigate();

  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(3).max(64).required(),
    passWord: Yup.string().min(6).max(20).required(),
  });

  const handleSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className={cx("wrapper")}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>userName:</label>
          <ErrorMessage name="userName" component="span"></ErrorMessage>
          <Field
            className={cx("user-input")}
            name="userName"
            placeholder="username..."
          />
          <label>passWord:</label>
          <ErrorMessage name="passWord" component="span"></ErrorMessage>
          <Field
            className={cx("password-input")}
            name="passWord"
            placeholder="Password..."
            type="password"
          />
          <button type="submit">create account</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
