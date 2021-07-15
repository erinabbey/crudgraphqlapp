import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "./Login.css";
import { useHistory } from "react-router-dom";
import validateInput from "./handleform/validateInput";
import HandleForm from "./handleform/HandleForm";

const Login = () => {
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    graphQLErrors: "",
  });
  const [dataSignIn, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  // const [error, setError] = useState("");
  const history = useHistory();

  // // mutate function
  const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  // execute mutate function
  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      console.log("result", result.data.login.token);
      setToken(result.data.login.token);
      console.log("error", result.errors[0].message);
      setErrors((prevState) => {
        return {
          ...prevState,
          graphQLErrors: result.errors[0].message,
        };
      });
    },
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem("token", login.token.toString());
        console.log("token", localStorage.getItem("token"));
        // setToken(localStorage.getItem("token"));
        // console.log("token", token);
      }
    },
    variables: dataSignIn,
    onError(err) {
      console.log("graphQLErrors", err.graphQLErrors);
    },
  });

  // when user click submit
  const handleSignIn = (e) => {
    e.preventDefault();
    //validate inputs empty or invalid
    const validate = validateInput(dataSignIn);
    console.log(validate);

    setErrors(validate);
    console.log(errors);
    login();
    let result = Object.values(errors).every((o) => o === "");
    console.log(result);
    console.log("token", token);
    if (result) {
      // history.push("/");
      console.log("com");
    }
  };

  // // handle when change value in input fields
  const handleChange = (e) => {
    // const { name, value } = e.target.value;
    setDataSignIn({
      ...dataSignIn,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="formContent">
      <form className="form" onSubmit={handleSignIn}>
        <div className="formInputs">
          <label htmlFor="email" className="formLabel">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="formInput"
            placeholder="Email"
            value={dataSignIn.email}
            onChange={handleChange}
          />
          {errors.emailError && <p>{errors.emailError}</p>}
        </div>
        <div className="formInputs">
          <label htmlFor="password" className="formLabel">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="formInput"
            placeholder="Password"
            value={dataSignIn.password}
            onChange={handleChange}
          />
          {errors.passwordError && <p>{errors.passwordError}</p>}
        </div>
        <button className="formInputBtn" type="submit" onClick={handleSignIn}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
