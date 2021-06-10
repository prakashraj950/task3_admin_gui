import axios from "axios";
import React, { Component } from "react";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { data: new FormData(), 
      photo: "",
  labelData:{},
};
  }

  onChangehandle=(e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    this.setState({ photo: window.URL.createObjectURL(file) });
    const { data } = this.state;
    data.append(name, file);
    this.setState({ data });
  };
  adHandle=(input)=>(e) => {
    const file = e.target.value;
    const {labelData} = this.state;
    labelData[input] = file;
    this.setState({labelData})
    }
    
    submit=()=>{
      axios.post('http://localhost:8000/label',{data:this.state.labelData})
    }

  
    upload=()=>{
    axios.post('http://localhost:8000/upload',this.state.data)
  }

  render() {
    const { photo } = this.state;
    const { match: { params }  } = this.props;
    const step = params.name === "ads" ? 1 : 2;
    switch (step) {
      case 1:
        return (
          <div>
            <img src={photo} width="200" height="200" />
            <input
              type="file"
              name="file"
              accept="image/gif, image/png, image/jpeg, image/jpg"
              onChange={this.onChangehandle}
            />
            <button onClick={this.upload}>upload new ad</button>
          </div>
        );

      case 2:
        return (<div>
          Ad_id<input name="Ad_id" type="number" onChange={this.adHandle("Ad_id")}/>
	       <div><br/><br/>
          age_group
          <select
            name="age_group"
            onChange={this.adHandle("age_group")}>
            <option name="city" value={1}>
              1-18
            </option>
            <option name="city" value={2}>
              18-25
            </option>
            <option name="city" value={3}>
              25-40
            </option>
          </select>
        </div><br/><br/>
	        <div> 
          CITY
          <select
            name="city"
            onChange={this.adHandle("city")}>
            <option name="city" value="chennai">
              chennai
            </option>
            <option name="city" value="coimbatore">
              coimbatore
            </option>
            <option name="city" value="nellai">
              nellai
            </option>
          </select>
        </div>
        <button onClick={this.submit} >submit</button>
        </div>);
      default:
    }
  }
}

export default Admin;
