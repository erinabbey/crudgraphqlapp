import { AuthToken } from "../../auth/authToken";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router";

export const Logout = () => {
  const [, removeAuthToken] = AuthToken();
  const apolloClient = useApolloClient();
  const history = useHistory();
  const handleLogout = async () => {
    await apolloClient.clearStore();
    removeAuthToken();
    history.push("/");
  };
  return handleLogout;
};
