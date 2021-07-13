import React, { useState } from "react";
import "./Login.css";
import validateInput from "../login/handleform/validate";
import handleForm from "../login/handleform/HandleForm";

const Login = () => {
  const { handleChange, handleSignIn, dataSignIn, errors } = handleForm({
    validateInput,
  });
  const [email, setEmail] = useState("");
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
          {/* errors.email is true --> run <p> */}
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

/* nếu sign in success thì truyền props cho Navbar: signin = true để thay đổi các element của navbar
    - thêm phần: Studentlist, username, signout;  bỏ phần sign in/up.
    */
// get data from backend --> auth user, setSignin = true --> send to Navbar
// get value from field --> check
