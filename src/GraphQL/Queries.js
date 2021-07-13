import { gql } from "@apollo/client";
export const LOAD_USER = gql`
  query {
    users {
      hits {
        first_name
        last_name
        email
        address
        phone
        birthday
      }
    }
  }
`;
