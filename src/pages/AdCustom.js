import axios from "axios";
import React, { Component } from "react";
export default class AdCustom extends Component {
  constructor() {
    super();
    this.state = {
        data:{},
    };
}

onChangehandle=(input)=>(e)=>{
    const value = e.target.value;
    const {data} = this.state;
    data[input] = value;
    this.setState({data})
}
submit=()=>{
    const domain_name = localStorage.getItem('domain_name')
    axios.post('http://localhost:8000/custom',{data:this.state.data,domain_name:domain_name})
  }
render(){
return (<div>
    Ad_id<input name="Ad_id" type="number" onChange={this.onChangehandle("Ad_id")}/>
     <div><br/><br/>
     
    pages
    <select
      onChange={this.onChangehandle("page_id")}>
      <option  value={1}>
        Blog/javascript
        </option>
      <option  value={2}>
        Blog/diwali
      </option>
      <option  value={3}>
        Blog/prakash
      </option>
      <option  value={4}>
        Blog/react
      </option>
      <option  value={5}>
        about
      </option>
      <option  value={6}>
        RegisterPage
      </option>
      <option  value={7}>
        services
      </option>
      <option  value={8}>
        contact
      </option>
      <option  value={9}>
        Bloglist
      </option>
      <option  value={10}>
        Home
      </option>
      <option  value={11}>
        Loginpage
      </option>
    </select>
  </div>
  <button onClick={this.submit} >submit</button>
  </div>
  )
}
}