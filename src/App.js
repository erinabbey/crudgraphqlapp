import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
// import {cache} from 'cache'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import Login from "./login/Login";
import HomePage from "./homepage/HomePage";

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
    headers: {
      authorization: localStorage.getItem("token") || "",
    },
    defaultOptions,
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route component={Login} path="/user/login" />
          <Route component={HomePage} path="/" />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
