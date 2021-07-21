import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "./Login.css";
import { useHistory } from "react-router";
import { saveTokens, saveUsername } from "../../auth/AuthToken";
import validateInput from "./handleform/validateInput";

const TOKEN_NAME = "token";
const USER_NAME = "username";

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
  const history = useHistory();
  // // mutate function
  const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  const [login, { loading }] = useMutation(LOGIN_USER);
  async function submitLogin(e) {
    e.preventDefault();
    const validate = validateInput(dataSignIn);
    console.log(validate);
    const { data } = await login({ variables: dataSignIn });
    console.log(data.login.token);
    if (data && data.login) {
      saveTokens(data.login.token);
      saveUsername(dataSignIn.email);
      history.push("/");
    }
  }

  // when user click submit
  const handleSignIn = (e) => {
    e.preventDefault();
    const validate = validateInput(dataSignIn);
    console.log(validate);

    // localStorage.removeItem(TOKEN_NAME);
    // login();
    let token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      history.push("/");
      console.log("cc");
    }
  };

  // // handle when change value in input fields
  const handleChange = (e) => {
    setDataSignIn({
      ...dataSignIn,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="formContent">
      <form className="form" onSubmit={submitLogin}>
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
        <button className="formInputBtn" type="submit" onClick={submitLogin}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
