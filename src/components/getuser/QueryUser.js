// import { gql } from "@apollo/client";
import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from "react-query";
import { getTokens } from "../../auth/AuthToken";

export function QueryUsers() {
  const httpLink = "https://api.omcustom.com/query";

  const QUERY_USER = gql`
    query {
      users {
        hits {
          first_name
          last_name
        }
      }
    }
  `;
  const token = getTokens();
  console.log(token);
  const authHeader = new GraphQLClient(httpLink, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const userlist = async () => await authHeader.request(QUERY_USER);

  // return useQuery("query_users", async () => {
  //   const { users_list } = await authHeader.request(QUERY_USER);
  //   return users_list;
  // });
  return useQuery("query_users", userlist);
}
