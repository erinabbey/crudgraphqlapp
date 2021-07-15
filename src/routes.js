import Login from "./login/Login";
import HomePage from "./homepage/HomePage";

const routes = [
  { component: Login, path: "/user/login", exact: true },
  { component: HomePage, path: "/", exact: true },
];
export default routes;
