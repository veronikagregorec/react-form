import React from "react";

function TableRows(props) {
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

export default TableRows;
