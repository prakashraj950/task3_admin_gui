import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class ServedData extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
       formdata:{},
       data:[] 
    };
    
}
componentDidMount(){
   
    this.search()
}

search=()=>{
    const data = this.filterdata(this.state.formdata)
    axios.post('http://localhost:8000/servedata',{data:data})
    .then((res)=>{
        console.log(res.data);
        this.setState({data:res.data})
    })
}

filterdata(formdata){
 const data = { domain_name: localStorage.getItem('domain_name') }
 if ( formdata.age_group !== ""){
     data.age_group = formdata.age_group;
 }
  if (formdata.city !== ""){
     data.city = formdata.city;
}
return data;
}
onChangeHandle=(input)=>(e) => {
    const file = e.target.value;
    const {formdata} = this.state;
    formdata[input] = file;
    this.setState({formdata})
    }


render(){
    const {data} = this.state
    
   const tab = data.map(e=>(<tr key={e.id}> 
                        <td>{e.id}</td>
                        <td>{e.Ad_id}</td>
                        <td>{e.domain_id}</td>
                        <td>{e.page_id}</td>
                        <td>{e.user}</td>
                        <td>{e.age_group}</td>
                        <td>{e.city}</td>
                        <td>{e.served_time}</td>
                        <td>{e.ip_address}</td>
                        <td>{e.clicked}</td>
                        </tr>))
   
  return(<div>
      <div>
      age_group
          <select
            name="age_group"
            onChange={this.onChangeHandle("age_group")}>
            <option  value={1}>
              1-18
            </option>
            <option value={2}>
              18-25
            </option>
            <option  value={3}>
              25-40
            </option>
          </select>
          CITY
          <select
            name="city"
            onChange={this.onChangeHandle("city")}>
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
        <button onClick={this.search}>search</button>

      </div>
       <table>
        <tr>
            <th>id</th>
            <th>Ad id</th>
            <th>domain id</th>
            <th>page id</th>
            <th>user</th>
            <th>age group</th>
            <th>city</th>
            <th>served time</th>
            <th>ip address</th>
            <th>clicked</th>
        </tr>
        {tab}
        </table>
        
        <button onClick={this.delete}>Delete</button>
  </div>)
  
  
  
}
}