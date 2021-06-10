import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import AdminList from "./pages/AdminList";
import React from "react";
import Admin from "./pages/Admin";
export default class App extends React.Component {
  constructor() {
    super();
  }

  setAppState = (domain_name, password) => {
    localStorage.setItem("domain_name", domain_name);
    localStorage.setItem("password", password);
  };
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/">
              <Home setAppState={this.setAppState} />
            </Route>
            <Route path="/AdminList" component={AdminList} />
            <Route path="/admin/:name" component={Admin} />
          </div>
        </Router>
      </div>
    );
  }
}
