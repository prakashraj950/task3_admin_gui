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
          <div className="container">
            <h2>Welcome</h2>
            <div className="row" style={{display:'flex',justifyContent:'center'}}>
            <div class="input-group col-sm-3">
              Domain
              <input
              className="form-control"
                name="domain_name"
                placeholder="domain_name"
                value={domain_name}
                type="text"
                onChange={this.onChangehandle}
              />
              </div>
            </div>
              <br />
              <br />
              <div className="row" style={{display:'flex',justifyContent:'center'}}>
              <div class="input-group">
              PASSWORD
              <input
              className="form-control"
                name="password"
                type="password"
                value={password}
                onChange={this.onChangehandle}
              />
            </div>
              </div>
              <br />
              <br />
              <button className="btn btn-primary" onClick={this.login}>Login</button>
          </div>
        );
      case 2:
        return <Redirect to={"AdminList"} />;

      default:
    }
  }
}
export default Home;
