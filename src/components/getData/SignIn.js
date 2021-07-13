import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "apollo-boost";
import "../login/Login.css";
import { useHistory } from "react-router";

const SignIn = () => {
  const [dataSignIn, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const history = useHistory();

  // mutate function
  const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;
  // execute mutation function
  const [login, { loading, errors }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem("token", login.token.toString());
        history.push("/");
      }
    },
    variables: {
      email: dataSignIn.email,
      password: dataSignIn.password,
    },
    onError(errors) {
      setError(errors.graphQLErrors[0].extensions.exception.errors);
      console.log("error", error);
    },
  });

  // when user click submit
  const handleSignIn = (e) => {
    e.preventDefault();
    login();
  };

  // handle when change value in input fields
  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setDataSignIn({
      ...dataSignIn,
      [name]: value,
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
        </div>
        <button className="formInputBtn" type="submit">
          Sign in
        </button>
        <button className="formInputBtn" onClick={handleSignIn}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
