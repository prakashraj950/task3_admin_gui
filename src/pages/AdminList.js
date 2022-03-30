import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminList extends Component {
  render() {
    return (
      <div>
        <h2>Admin</h2>
        <p>This is Admin page</p>
        <ul class="list-group">
          <li class="list-group-item">
            <Link to="admin">insert ads</Link>
          </li>
          
          <li class="list-group-item">
            <Link to="deletePage">manage ads</Link>
          </li>
          <li class="list-group-item">           
            <Link to="ServedData">Served data</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminList;
