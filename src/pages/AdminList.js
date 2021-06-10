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
            <Link to="admin/ads">insert ads</Link>
          </li>
          <li>
            <Link to="admin/ad_label">Ad label</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminList;
