import React from "react";
import { gql } from "@apollo/client";

const QueryUser = () => {
  const GET_USER = gql`
    query {
      users {
        hits {
          first_name
          last_name
        }
      }
    }
  `;
  const handleGetUser = () => {
    const token = localStorage.getItem("token");
  };
  return <div></div>;
};

export default QueryUser;
