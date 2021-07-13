import React, { useState } from "react";
import { CREATE_USER } from "../../GraphQL/Mutation";
import { useMutation } from "@apollo/client";
import "./SignUp.css";

const SignUp = () => {
  const [dataSignUp, setDataSignUp] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    birthday: "",
  });

  const [createUser, { error }] = useMutation(CREATE_USER);
  const addUser = () => {
    createUser({
      variables: {
        first_name: dataSignUp.firstname,
        last_name: dataSignUp.lastname,
        email: dataSignUp.email,
        pass: dataSignUp.pass,
        role: Math.random().toString(),
        address: dataSignUp.address,
        phone: dataSignUp.phone,
        birthday: dataSignUp.birthday,
      },
    });
    if (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="formContent">
      <form className="form">
        <div className="formInputs">
          <label htmlFor="firstname" className="formLabel">
            First name
          </label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            className="formInput"
            placeholder="First name"
            value={dataSignUp.firstname}
            onChange={(e) => {
              setDataSignUp({
                ...dataSignUp,
                firstname: e.target.value,
              });
            }}
          />
        </div>
        <div className="formInputs">
          <label htmlFor="lastname" className="formLabel">
            Last name
          </label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            className="formInput"
            placeholder="Last name"
            value={dataSignUp.lastname}
            onChange={(e) => {
              setDataSignUp({
                ...dataSignUp,
                lastname: e.target.value,
              });
            }}
          />
        </div>
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
            value={dataSignUp.email}
            onChange={(e) => {
              setDataSignUp({
                ...dataSignUp,
                email: e.target.value,
              });
            }}
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
            value={dataSignUp.password}
            onChange={(e) => {
              setDataSignUp({
                ...dataSignUp,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div className="formInputs">
          <label htmlFor="phone" className="formLabel">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            className="formInput"
            placeholder="Phone"
            value={dataSignUp.address.phone}
            onChange={(e) => {
              setDataSignUp({
                ...dataSignUp,
                phone: e.target.value,
              });
            }}
          />
        </div>
        <div className="formInputs">
          <label htmlFor="address" className="formLabel">
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            className="formInput"
            placeholder="Address"
            value={dataSignUp.address}
            onChange={(e) => {
              setDataSignUp({
                ...dataSignUp,
                address: e.target.value,
              });
            }}
          />
        </div>
        <div className="formInputs">
          <label htmlFor="dob" className="formLabel">
            Birthday
          </label>
          <input
            id="dob"
            type="date"
            name="dob"
            className="formInput"
            placeholder="Date of birthday"
            value={dataSignUp.birthday}
            onChange={(e) => {
              setDataSignUp({
                ...dataSignUp,
                birthday: e.target.value,
              });
            }}
          />
        </div>
        <button className="formInputBtn" type="submit" onClick={createUser}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
