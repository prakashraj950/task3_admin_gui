import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router";
export default class DeletePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        step: 1
    };
}
componentDidMount(){
  axios.get('http://localhost:8000/getads')
  .then((res)=>{
    this.setState({data:res.data})
  })
}
onClickhandle=(id)=>()=>{
this.props.selectId(id);
this.setState({step:2})
}

render(){
  const {data,step} = this.state
  console.log(data);
  const body = data.map(files=>(
  <div onClick={this.onClickhandle(files.id)}><img src={`http://localhost:8000/ads/${files.file}`} width="150" height="150" />
  <h4>id:{files.id}</h4>
  </div>
  
  ))
  switch (step) {
    case 1:
        
  return (<div>
    {body}
  </div>
  
  )
  case 2:
    return <Redirect to="delete"></Redirect>
}
}
}