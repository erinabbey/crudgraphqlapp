export default function validateInput(dataSignIn) {
  let errors = {};
  //   const emailParttern = /^[a-zA-Z][0-9]@[a-z0-9](\.[a-z0-9])$;
  if (!dataSignIn.email) {
    errors.emailError = "Email is required";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(dataSignIn.email)) {
    errors.emailError = "Email is Invalid";
  }
  if (!dataSignIn.password) {
    errors.passwordError = "Password is required";
  }
  return errors;
}
