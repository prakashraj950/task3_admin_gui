import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router";
import AdCustom from "./AdCustom";
export default class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
        step:1,
       ads:{id:this.props.selectedId,
            file:""},
       custom:[],
       label:[],
       labelData:{Ad_id: this.props.selectedId} 
    };
    
}
componentDidMount(){
    this.getdata();
}

getdata=()=>{
    axios.post('http://localhost:8000/getdata',{Ad_id: this.props.selectedId,domain_name:localStorage.getItem("domain_name")})
    .then((res)=>{
        res.data.ads_row.file = `http://localhost:8000/ads/${res.data.ads_row.file}`
        this.setState({ads:res.data.ads_row,
            custom:res.data.custom_row,
            label:res.data.label_row})
    })
}

delete=async()=>{
   await axios.post('http://localhost:8000/delete',{id:this.state.ads.id,Labeltable:"ad_label",Customtable:"ad_custom"});
   this.setState({step:2})

}
adHandle=(input)=>(e) => {
    const file = e.target.value;
    const {labelData} = this.state;
    labelData[input] = file;
    this.setState({labelData})
    }
    
    submit=()=>{
      axios.post('http://localhost:8000/label',{data:this.state.labelData});
      this.getdata();
    }

render(){
    const {ads,custom,label,step} = this.state
    const ads_row = (<tr><td><img src={ads.file} ></img></td></tr>)
   const custom_row = custom.map(e=>(<tr> 
                        
                        <td>{e.Domain_id}</td>
                        <td>{e.page_id}</td>
                        </tr>))
   const label_row =  label.map(e=>(<tr>
                            <td>{e.age_group}</td>
                          <td>{e.city}</td></tr>))
 
 switch (step) {
     case 1:
 
    return(<div>
    <h1>ID</h1>  <h2>{ads.id}</h2>
       <table>
        <tr>
            <th>ads</th>
        </tr>
        {ads_row}
        </table>
        <br/><br/>

        <h2>ad custom</h2>
        <AdCustom id={this.state.ads.id} getdata={this.getdata}/>
        <table>
        <tr>
        <th>Domain_id</th>
        <th>page_id</th>
        </tr>
        {custom_row}
        </table>
        <br/><br/>

        <h1>ad Label</h1>
        <div>
          
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
        <button onClick={this.submit} >add</button>
        </div>
   
        <table>
         <tr>
        <th>age_group</th>
        <th>city</th>
        </tr>
        {label_row}
        </table>
        <button onClick={this.delete}>Delete</button>
  </div>)
  case 2:
      return <Redirect to="deletePage"></Redirect>
    }
  
}
}