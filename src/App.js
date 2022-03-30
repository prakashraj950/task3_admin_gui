import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import AdminList from "./pages/AdminList";
import React from "react";
import Admin from "./pages/Admin";
import DeletePage from "./pages/deletePage";
import Delete from "./pages/delete";
import ServedData from "./pages/servedata";
export default class App extends React.Component {
  constructor() {
    super();
    this.state={
      selectedId:""
    }
  }

  setAppState = (domain_name, password) => {
    localStorage.setItem("domain_name", domain_name);
    localStorage.setItem("password", password);
  };
  selectId=(selectedId)=>{
    console.log(selectedId)
    this.setState({selectedId})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/">
              <Home setAppState={this.setAppState} />
            </Route>
            <Route path="/AdminList" component={AdminList} />
            <Route path="/admin" component={Admin} />
            <Route path="/deletePage">
              <DeletePage selectId={this.selectId} />
            </Route>
            <Route path="/delete">
              <Delete selectedId={this.state.selectedId}/>
            </Route>
            <Route path="/ServedData" component={ServedData} />
          </div>
        </Router>
      </div>
    );
  }
}
