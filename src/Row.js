import React from "react";

function Row(props) {
  return (
    <div>
      <tr>
        <td>{props.users.name}</td>
        <td>{props.users.sname}</td>
        <td>{props.users.email}</td>
      </tr>
    </div>
  );
}

export default Row;
