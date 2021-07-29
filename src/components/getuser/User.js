import React from "react";
import { useState } from "react";
import { GraphQLClient } from "graphql-request";
import gql from "graphql-tag";
import { getTokens } from "../../auth/AuthToken";
import { setContext } from "apollo-link-context";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Button, Form, Input, message, Select, Modal } from "antd";
import "./User.css";

import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({ uri: "https://api.omcustom.com/query" });
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
    }
  }
`;
const User = () => {
  const [user, setUser] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    pass: "",
    phone: "",
    role: [],
  });
  const handleGetUser = () => {
    client
      .query({
        query: gql`
          query {
            users {
              hits {
                first_name
                last_name
              }
            }
          }
        `,
      })
      .then((result) => {
        setUser(result.data.users.hits);
        console.log("user", user);
        // console.log("data", result);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error);
      });
  };
  const handleAddUser = () => {
    client
      .mutate({
        mutation: ADD_USER,
        variables: {
          input: userData,
        },
      })
      .then((result) => {
        if (result) {
          message.info("Added!");
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error) {
          message.info("Error!");
          // console.log("cak");
        }
      });

    setShowAddUserForm(false);
  };
  const handleUserDataChange = ({ target: { name, value } }) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setUserData({
      ...userData,
      role: userData.role.concat([e]),
    });
  };
  console.log(typeof userData.role);
  console.log(userData);
  console.log(userData.role);

  const { Option } = Select;
  const addUserForm = (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="First name"
        name="firstname"
        rules={[{ required: true, message: "First name is required!" }]}
      >
        <Input
          name="first_name"
          value={userData.first_name}
          onChange={handleUserDataChange}
        />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="lastname"
        rules={[{ required: true, message: "Last name is required!" }]}
      >
        <Input
          name="last_name"
          value={userData.last_name}
          onChange={handleUserDataChange}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email is required!" }]}
      >
        <Input
          name="email"
          value={userData.email}
          onChange={handleUserDataChange}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required!" }]}
      >
        <Input.Password
          name="pass"
          value={userData.pass}
          onChange={handleUserDataChange}
        />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Phone is required!" }]}
      >
        <Input
          name="phone"
          value={userData.phone}
          onChange={handleUserDataChange}
        />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Address is required!" }]}
      >
        <Input
          name="address"
          value={userData.address}
          onChange={handleUserDataChange}
        />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Role is required!" }]}
      >
        <Select
          value={userData.role[0]}
          name="role"
          onChange={(value) => handleRoleChange(value)}
          defaultValue="Administrator"
        >
          <Option value="Administrator" disabled>
            Administrator
          </Option>
          <Option value="Seller">Seller</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => message.info("Saved!")}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="userContainer">
      <Button type="primary" onClick={() => handleGetUser()}>
        Show User
      </Button>
      <ul>
        {user &&
          user.map((u) => (
            <li>
              {u.first_name} {u.last_name}
            </li>
          ))}
      </ul>
      <Button type="primary" onClick={() => setShowAddUserForm(true)}>
        Add User
      </Button>
      <Modal
        title="Add user"
        visible={showAddUserForm}
        onOk={() => handleAddUser()}
        onCancel={() => setShowAddUserForm(false)}
      >
        {addUserForm}
      </Modal>
    </div>
  );
};
export default User;
