import { QueryUsers } from "./QueryUser";
import User from "./User";

const UsersList = () => {
  const { users_list, error, isLoading, isSuccess } = QueryUsers();
  console.log(users_list, error);
  console.log(isSuccess, isLoading);

  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    isSuccess && (
      <div>
        {users_list.users.hits.map((user) => (
          <User user={user} />
        ))}
      </div>
    )
  );
};
export default UsersList;
