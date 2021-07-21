import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import {
  Login,
  HomePage,
  Navbar,
  HandleTags,
  UsersList,
} from "./components/index";

function App() {
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  };
  const client = new ApolloClient({
    //   link: new HttpLink("https://api.omcustom.com/query"),
    //   cache: new InMemoryCache(),
    //   defaultOptions,
    cache: new InMemoryCache(),
    uri: "https://api.omcustom.com/query",
    // headers: {
    //   authorization: localStorage.getItem("token") || "",
    // },
    defaultOptions,
  });
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router>
          <Navbar />
          <Switch>
            <Route component={Login} path="/user/login" />
            <Route component={UsersList} path="/user/getuser" />
            <Route component={HandleTags} path="product/tags" />
            <Route component={HomePage} path="/" />
          </Switch>
        </Router>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
