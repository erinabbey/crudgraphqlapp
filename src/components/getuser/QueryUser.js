// import { gql } from "@apollo/client";
import { useState } from "react";
import { GraphQLClient } from "graphql-request";
import gql from "graphql-tag";
import { useQuery } from "react-query";
import { getTokens } from "../../auth/AuthToken";
import { setContext } from "apollo-link-context";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({ uri: "https://api.omcustom.com/query" });

const QUERY_USERS = gql`
  query {
    users {
      hits {
        first_name
        last_name
      }
    }
  }
`;
const QUERY_USER = gql`
  query userById($id: String!) {
    userById(id: $id) {
      first_name
      last_name
      email
    }
  }
`;
const token = getTokens();
console.log(token);
const authHeader = new GraphQLClient(httpLink, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// const userlist = async () => await authHeader.request(QUERY_USER);

// console.log(userlist);

export function QueryUsers() {
  return useQuery("query_users", async () => {
    const { users_list } = await authHeader.request(QUERY_USERS);
    return users_list;
  });
  // return useQuery("query_users", userlist);
}
export function QueryUser(userID) {
  return useQuery(["query_user", userID], async () => {
    const { user } = await authHeader.request(QUERY_USER, userID);
    return user;
  });
}

export function TestQuery() {
  const [user, setUser] = useState({});
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
      setUser(result.users.hits);
      console.log(result.users);
    })
    .catch((error) => console.log("error", error));
  return user;
}
