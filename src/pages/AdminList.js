import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminList extends Component {
  render() {
    return (
      <div>
        <h2>Admin</h2>
        <p>This is Admin page</p>
        <ul>
          <li>
            <Link to="admin">insert ads</Link>
          </li>
          
          <li>
            <Link to="deletePage">manage ads</Link>
          </li>
          <li>
            <Link to="ServedData">Served data</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminList;
