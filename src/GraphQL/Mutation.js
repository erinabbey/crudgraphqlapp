import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $pass: String!
    $address: String!
    $birthday: Time
    $role: [String!]!
  ) {
    createUser(
      input: {
        first_name: $firstName
        last_name: $lastName
        email: $email
        pass: $pass
        role: $role
        address: $address
        phone: $phone
        # is_subscription: $is_subsciption
        birthday: $birthday
      }
    ) {
      first_name
      last_name
      phone
      email
      address
    }
  }
`;
