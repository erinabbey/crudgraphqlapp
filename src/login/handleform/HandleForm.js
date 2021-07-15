import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import validateInput from "./validateInput";

const HandleForm = () => {
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
        setToken(localStorage.getItem("token"));
        console.log("token", token);
      }
    },
    variables: dataSignIn,
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });

  // when user click submit
  const handleSignIn = (e) => {
    e.preventDefault();
    const validate = validateInput(dataSignIn);
    setErrors(validate);
    login();
    console.log(errors);
    let result = Object.values(errors).every((o) => o === "");
    console.log(result);
    console.log("token", token);
    if (result) {
      // history.push("/");
      console.log("cc");
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
  return { handleChange, handleSignIn, errors, dataSignIn };
};

export default HandleForm;
