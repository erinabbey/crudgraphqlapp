import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { AuthToken } from "../../auth/AuthToken";
import { gql } from "@apollo/client";

const HandleTags = () => {
  const ADD_TAG = gql`
    mutation {
      createTag(input: {})
    }
  `;
  return <div></div>;
};

export default HandleTags;
