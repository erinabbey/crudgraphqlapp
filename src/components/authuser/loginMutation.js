import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthToken } from "../../auth/auth";
import { Mutation } from "@apollo/react-components";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const useLoginMutation = () => {
  const [, setAuthToken, removeAuthToken] = AuthToken();
  const [mutation, mutationResult] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      setAuthToken(data.result.token);
    },
    onError(err) {
      console.log("graphQLErrors", err.graphQLErrors);
    },
  });
  const loginVar = (email, password) => {
    removeAuthToken();
    return Mutation({
      variables: {
        login: email,
        password,
      },
    });
  };
  return [loginVar, mutationResult];
};
