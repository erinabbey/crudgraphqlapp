export default function validateInput(dataSignIn) {
  let errors = {};
  //   const emailParttern = /^[a-zA-Z][0-9]@[a-z0-9](\.[a-z0-9])$;
  if (!dataSignIn.email) {
    errors.emailErrors = "Email is required";
  } else if (!/^[a-z0-9]@[a-z0-9](\.[a-z0-9])+$/.test(dataSignIn.email)) {
    errors.emailErrors = "Email is Invalid";
  }
  if (!dataSignIn.password) {
    errors.passwordError = "Password is required";
  }
  return errors;
}
