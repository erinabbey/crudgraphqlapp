import Login from "./components/authuser/Login";
import HomePage from "./components/homepage/HomePage";
import QueryUser from "./components/getuser/QueryUser";

const routes = [
  { component: Login, path: "/user/login", exact: true },
  { component: HomePage, path: "/", exact: true },
  { component: QueryUser, path: "/user/getuser", exact: true },
];
export default routes;
