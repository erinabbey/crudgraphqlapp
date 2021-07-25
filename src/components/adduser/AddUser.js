import { useState } from "react";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { createHttpLink } from "apollo-link-http";
import { getTokens } from "../../auth/AuthToken";

const httpLink = createHttpLink({
  uri: "https://api.omcustom.com/query",
});
const token = getTokens();
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

const ADD_USER = gql`
  mutation createUser($input: NewUser!) {
    createUser(input: $input) {
      id
      first_name
      last_name
      email
      address
      phone
      birthday
      roles {
        id
        name
      }
      is_subscription
    }
  }
`;
