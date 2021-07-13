import React, { useState } from "react";

const HandleForm = () => {
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const [dataSignIn, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target.value;
    setDataSignIn({
      ...dataSignIn,
      [name]: value,
    });
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("email errors", errors.emailError);
  };
  return { handleInputChange, handleSignIn, dataSignIn, errors };
};

export default HandleForm;
