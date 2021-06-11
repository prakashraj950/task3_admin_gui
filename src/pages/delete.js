import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
       ads:{id:this.props.selectedId,
            file:""},
       custom:[],
       label:[], 
    };
    
}
componentDidMount(){
    axios.post('http://localhost:8000/getdata',{Ad_id: this.props.selectedId,domain_name:localStorage.getItem("domain_name")})
    .then((res)=>{
        res.data.ads_row.file = `http://localhost:8000/ads/${res.data.ads_row.file}`
        this.setState({ads:res.data.ads_row,
            custom:res.data.custom_row,
            label:res.data.label_row})
    })
}

delete=async()=>{
   await axios.post('http://localhost:8000/delete',{id:this.state.ads.id,Labeltable:"ad_label",Customtable:"ad_custom"})

}

render(){
    const {ads,custom,label} = this.state
    const ads_row = (<tr><td><img src={ads.file} ></img></td></tr>)
   const custom_row = custom.map(e=>(<tr> 
                        <td>{e.Ad_id}</td>
                        <td>{e.Domain_id}</td>
                        <td>{e.page_id}</td>
                        </tr>))
   const label_row =  label.map(e=>(<tr><td>{e.Ad_id}</td>
                            <td>{e._id}</td>
                            <td>{e.Ad_id}</td></tr>))
  return(<div>
       <table>
        <tr>
            <th>ads</th>
        </tr>
        {ads_row}
        </table>
        <br/><br/>

        <h2>ad custom</h2>
        <table>
        <tr>
        <th>Ad_id</th>
        <th>Domain_id</th>
        <th>page_id</th>
        </tr>
        {custom_row}
        </table>
        <br/><br/>

        <h1>ad Label</h1>
        <table>
         <tr>
        <th>Ad_id</th>
        <th>age_group</th>
        <th>city</th>
        </tr>
        {label_row}
        </table>
        <button onClick={this.delete}>Delete</button>
  </div>)
  
  
  
}
}