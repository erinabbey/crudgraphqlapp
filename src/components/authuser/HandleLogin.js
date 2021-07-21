import React from "react";
import "./Login.css";
import HandleForm from "./handleform/HandleForm";
import validateInput from "./handleform/validateInput";
import { useLoginMutation } from "./loginMutation";

const AuthLogin = ({ loading }) => {
  const [loginMutation] = useLoginMutation();
  const { handleChange, handleSignIn, errors, dataSignIn } = HandleForm({
    validateInput,
  });
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
