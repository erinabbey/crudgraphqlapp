import { QueryUsers, QueryUser, TestQuery } from "./QueryUser";
import User from "./User";
import { useParams } from "react-router-dom";
const UsersList = () => {
  // const { users_list, error, isLoading, isSuccess } = QueryUsers();
  // const { id } = useParams();
  // const { user, err, isLoad, isSuc } = QueryUser(id);
  const { u } = TestQuery();
  console.log("test query", u);
  // console.log("param", id);
  // console.log(user);
  // console.log(users_list, error);
  // console.log(isSuccess, isLoading);

  // if (error) return <h1>Something went wrong!</h1>;
  // if (isLoading) return <h1>Loading...</h1>;
  return (
    // isSuccess && (
    //   <div>
    //     {users_list.users.hits.map((user) => (
    //       <User user={user} />
    //     ))}
    //   </div>
    <div>{u}</div>
  );
};
export default UsersList;
