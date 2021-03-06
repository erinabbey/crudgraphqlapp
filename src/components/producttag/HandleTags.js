import { useState } from "react";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { createHttpLink } from "apollo-link-http";
import { getTokens } from "../../auth/AuthToken";
import "./Handletags.css";
import { Tag, Input, Button, Form, Modal, Space, Tooltip, message } from "antd";

const httpLink = createHttpLink({
  uri: "https://api.omcustom.com/query",
});
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

const ADD_TAG = gql`
  mutation createTag($input: NewTag!) {
    createTag(input: $input) {
      id
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
  mutation updateTag($input: EditTag!) {
    updateTag(input: $input) {
      id
      title
      description
    }
  }
`;

const HandleTags = () => {
  const [tags, setTags] = useState({
    id: "",
    title: "",
    desc: "",
  });
  const [showEditTagForm, setShowEditTagForm] = useState(false);
  const [getTags, setGetTags] = useState([]);
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editInputValue, setEditInputValue] = useState({
    id: "",
    title: "",
    description: "",
  });
  const handleCreateTag = () => {
    client
      .mutate({
        mutation: ADD_TAG,
        variables: {
          input: inputValue,
        },
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  const handleGetTags = () => {
    client
      .query({
        query: QUERY_TAGS,
      })
      .then((result) => {
        setGetTags(result.data.tags.hits);
        console.log(getTags);
        setTags({
          ...tags,
          id: result.data.tags.hits.id,
          title: result.data.tags.hits.title,
          desc: result.data.tags.hits.description,
        });
      });
  };
  const handleEditTag = () => {
    client
      .mutate({
        mutation: UPDATE_TAG,
        variables: {
          input: editInputValue,
        },
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  const handleDeleteTag = (tagID) => {
    client
      .mutate({
        mutation: DELETE_TAG,
        variables: {
          id: tagID,
        },
      })
      .then((result) => console.log("result of delete", result))
      .catch((error) => console.log(error));
  };
  const handleCancelModal = () => {
    setShowModal(false);
  };
  const handleOkModal = () => {
    handleCreateTag();
    setShowModal(false);
  };
  const handleChangeInputValue = ({ target: { name, value } }) => {
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const showFormAddTag = (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Title"
        name="tt"
        rules={[{ required: true, message: "Input title of tag" }]}
      >
        <Input
          name="title"
          value={inputValue.title}
          onChange={handleChangeInputValue}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="desc"
        rules={[{ required: false, message: "Input description of tag" }]}
      >
        <Input
          name="description"
          value={inputValue.description}
          onChange={handleChangeInputValue}
        />
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
  const showTag = () => {
    handleGetTags();
    console.log("getag", getTags);
  };
  const deleteTag = (tagID) => {
    handleDeleteTag(tagID);
  };

  const handleEditInputValueChange = (e) => {
    console.log(editInputValue);
    setEditInputValue({
      ...editInputValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleOkModalEditTag = () => {
    handleEditTag();
    console.log(editInputValue);
  };
  const setShowEditTagFormForm = (
    <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="ID" name="id">
        <Input
          disabled
          name="id"
          placeholder={editInputValue.id}
          value={editInputValue.id}
          onChange={handleEditInputValueChange}
        />
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input
          name="title"
          placeholder={editInputValue.title}
          value={editInputValue.title}
          onChange={handleEditInputValueChange}
        />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input
          name="description"
          placeholder={editInputValue.description}
          value={editInputValue.description}
          onChange={handleEditInputValueChange}
        />
      </Form.Item>
    </Form>
  );
  return (
    <div className="tagContainer">
      <Space size="middle">
        <Button type="primary" onClick={() => showTag()}>
          Show tag
        </Button>
        {getTags.map((tag) => (
          <Tooltip title={tag.description} key={tag.id}>
            <Tag
              key={tag.id}
              closable
              onClose={() => deleteTag(tag.id)}
              onClick={() => {
                setShowEditTagForm(true);
                setEditInputValue({
                  ...editInputValue,
                  id: tag.id,
                  title: tag.title,
                  description: tag.description,
                });
                // setEditInputValue(tag);
                console.log(tag.id, tag.description, tag.title);
                console.log(editInputValue);
              }}
            >
              {tag.title}
            </Tag>
          </Tooltip>
        ))}
        <Modal
          title="Edit tag"
          visible={showEditTagForm}
          onOk={() => handleOkModalEditTag()}
          onCancel={() => setShowEditTagForm(false)}
        >
          {setShowEditTagFormForm}
        </Modal>
        <Button onClick={() => setShowModal(true)} type="primary">
          Add Tag
        </Button>
        <Modal
          title="addTag"
          visible={showModal}
          onOk={() => handleOkModal()}
          onCancel={() => handleCancelModal()}
        >
          {showFormAddTag}
        </Modal>
      </Space>
    </div>
  );
};

export default HandleTags;
