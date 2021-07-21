import React from "react";

export default function User({ user }) {
  const { first_name, last_name } = user;
  return (
    <div>
      <h4>{first_name}</h4>
      <h4>{last_name}</h4>
    </div>
  );
}
