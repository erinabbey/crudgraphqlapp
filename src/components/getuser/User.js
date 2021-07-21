import React from "react";
import { useState } from "react";
import { GraphQLClient } from "graphql-request";
import gql from "graphql-tag";
import { getTokens } from "../../auth/AuthToken";
import { setContext } from "apollo-link-context";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./User.css";

import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({ uri: "https://api.omcustom.com/query" });
const token = getTokens();

export default function User() {
  const [user, setUser] = useState([]);
  const authlink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const client = new ApolloClient({
    link: authlink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
  client
    .query({
      query: gql`
        query {
          users {
            hits {
              first_name
              last_name
            }
          }
        }
      `,
    })
    .then((result) => {
      setUser(result.data.users.hits);
      console.log("user", user);
      // console.log("data", result);
    })
    .catch((error) => console.log("error", error));
  return (
    <div className="userContainer">
      <ul>
        {user.map((u) => (
          <li>
            {u.first_name} {u.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
