import React, { useEffect, useState } from "react";
import gpl from "graphql-tag";
import { grapql } from "react-apollo";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USER } from "../../GraphQL/Queries";

const GetUser = () => {
  const { error, loading, data } = useQuery(LOAD_USER);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      // data.method[0]
      setUsers(data.GetUser);
      console.log("get User");
    }
  }, [data]);
  return (
    <div>
      {/* {users.map((user, index) => {
        <p key={index}>user.first_name</p>;
      })} */}
    </div>
  );
};
export default GetUser;
