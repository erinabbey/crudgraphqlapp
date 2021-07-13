import React, { useEffect, useState } from "react";
import SignIn from "./components/getData/SignIn";
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
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graph Error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.omcustom.com/query" }),
]);
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
  link: new HttpLink("https://api.omcustom.com/query"),
  cache: new InMemoryCache(),
  defaultOptions,
});

const App = () => {
  const [testdata, setTestData] = useState([]);

  // const fetchData = () => {
  //   const apiUrl = "https://api.omcustom.com/createUsers";
  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTestData(data);
  //       console.log("fetch data", data);
  //     });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  console.log(testdata);
  return (
    <ApolloClient client={client}>
      <SignIn />
    </ApolloClient>
  );
};
{
  /*
  <Router>
        <ApolloClient client={client}>
          <Switch>
            {routes.map(({ component, path, exact }, index) => (
              <Route key={index} path={path} exact={exact}>
                {component}
              </Route>
            ))}
          </Switch>
        </ApolloClient>
      </Router>
*/
}
// <ApolloClient client={client}>
//   <GetUser />
// </ApolloClient>
// <div>

//   <Form />
{
  /* user {testdata}
      <h4>get user</h4> */
}
// </div>

// const AppGetData = graphql(queryUser)(App);
export default App;
