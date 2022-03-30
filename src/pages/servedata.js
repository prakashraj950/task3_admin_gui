import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ACCESS_POINT } from "../config";
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
  console.log(this.state.formdata);
    const data = this.filterdata(this.state.formdata)
    console.log(data);
    axios.post(ACCESS_POINT+'/servedata',{data:data})
    .then((res)=>{
        console.log(res.data);
        this.setState({data:res.data})
    })
}

filterdata(formdata){
 const data = { domain_name: localStorage.getItem('domain_name') }
 if ( "age_group" in  formdata && formdata.age_group !== ""){
     data.age_group = formdata.age_group;
 }
  if ( "city" in  formdata && formdata.city !== ""){
     data.city = formdata.city;
    }
if ( "from_date" in  formdata && formdata.from_date !== ""){
  data.from_date = formdata.from_date
}
if ("to_date" in  formdata && formdata.to_date !== ""){
  data.to_date = formdata.to_date
}
if ("clicked" in  formdata && formdata.clicked !== ""){
  data.clicked = formdata.clicked
}
return data;
}
onChangeHandle=(input)=>(e) => {
    const file = e.target.value;
    const {formdata} = this.state;
    formdata[input] = file;
    this.setState({formdata})
    }
  onCheck=(e)=>{
    const {formdata} = this.state;
    if(e.target.checked){
      formdata[e.target.name] = 1;
    }else formdata[e.target.name] = 0;
    }

datehandle=(e)=>{
  const { formdata } = this.state;
  const date = e.target.valueAsDate
  let a = [{year: 'numeric'}, {month: '2-digit'}, {day: '2-digit'}];;
  let s = join(date, a, '-');
  formdata[e.target.name] = s;
  this.setState({ formdata });
}
render(){
    const {data} = this.state
    
   const tab = data.map(e=>(<tr key={e.id}> 
                        <td scope="row">{e.id}</td>
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
   
  return(<div class="container-fluid">
      <div class="row">
      <div class="col-sm-12">
 
      <div class="col-sm-2">
      <input type="checkbox" class="form-control"
      name="clicked"
       onChange={this.onCheck} 
      />
      Clicked report
      </div>
      <div class="col-sm-2">
      age_group
          <select class="form-control"
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
          </div>
          <div class="col-sm-2">
          CITY
          <select class="form-control"
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
          </div>
          <div class="col-sm-2">
                   from date <input class="form-control" type="date" name="from_date" onChange={this.datehandle}>
                   </input>
                     </div>
                     <div class="col-sm-1">
      to date <input class="form-control" type="date" name="to_date" onChange={this.datehandle}></input>
     
          </div>
      <div class="col-sm-2"> <button class="btn btn-primary" onClick={this.search}>search</button></div>
      
          </div>
      </div>
       <table class="table table-hover table-bordered">
       <thead>
        <tr>
            <th scope="col">id</th>
            <th scope="col">Ad id</th>
            <th scope="col">domain id</th>
            <th scope="col">page id</th>
            <th scope="col">user</th>
            <th scope="col">age group</th>
            <th scope="col">city</th>
            <th scope="col">served time</th>
            <th scope="col">ip address</th>
            <th scope="col">clicked</th>
        </tr>
        </thead>
        <tbody>
        {tab}
        </tbody>
        </table>
        
  </div>)
  
  
  
}
}
function join(t, a, s) {
  function format(m) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(t);
  }
  return a.map(format).join(s);
}