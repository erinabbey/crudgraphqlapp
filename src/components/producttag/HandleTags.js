import { useState } from "react";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { createHttpLink } from "apollo-link-http";
import { getTokens } from "../../auth/AuthToken";

const httpLink = createHttpLink({ uri: "https://api.omcustom.com/query" });
const token = getTokens();

const HandleTags = () => {
  const [tags, setTags] = useState({
    title: "",
    desc: "",
  });

  const [getTags, setGetTags] = useState([]);
  const ADD_TAG = gql`
    mutation createtag($title: String!, $description: String!) {
      createTag(input: { title: $title, description: $description }) {
        title
        description
      }
    }
  `;
  const QUERY_TAGS = gql`
    query {
      tags {
        hits {
          id
          title
          description
        }
      }
    }
  `;
  const DELETE_TAG = gql`
    mutation deleteTag($id: ID!) {
      deleteTag(id: $id)
    }
  `;
  const UPDATE_TAG = gql`
    mutation updateTag($id: ID!, $title: String, $description: String) {
      updateTag(input: { id: $id, title: $title, description: $description }) {
        id
        title
        description
      }
    }
  `;
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
    .mutate({
      mutation: ADD_TAG,
      variables: {
        title: tags.title,
        description: tags.desc,
      },
    })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  client
    .query({
      query: QUERY_TAGS,
    })
    .then((result) => {
      setGetTags(result.data.tags.hits);
    });
  return <div>con cak</div>;
};

export default HandleTags;
