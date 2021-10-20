import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ACCESS_POINT } from "../config";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, domain_name: "", password: "" };
  }

  onChangehandle = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  login = async() => {
    console.log("LOG");
   await axios.post(ACCESS_POINT+`/login`, {
        domain_name: this.state.domain_name,
        password: this.state.password
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          this.props.setAppState(this.state.domain_name, this.state.password);
          this.setState({ step: 2 });
        }
      });
  };

  render() {
    const { step, domain_name, password } = this.state;
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Welcome</h2>
            <div>
              Domain
              <input
                name="domain_name"
                placeholder="domain_name"
                value={domain_name}
                type="text"
                onChange={this.onChangehandle}
              />
              <br />
              <br />
              PASSWORD
              <input
                name="password"
                type="password"
                value={password}
                onChange={this.onChangehandle}
              />
              <br />
              <br />
              <button onClick={this.login}>Login</button>
            </div>
          </div>
        );
      case 2:
        return <Redirect to={"AdminList"} />;

      default:
    }
  }
}
export default Home;
