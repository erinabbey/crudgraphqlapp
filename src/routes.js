import SignIn from "./components/getData/SignIn";
import SignUp from "./components/signup/SignUp";
import HomePage from "./components/home/HomePage";

const routes = [
  { component: SignIn, path: "/user/signin", exact: true },
  { component: SignUp, path: "/user/signup", exact: true },
  { component: HomePage, path: "/", exact: true },
];
export default routes;
