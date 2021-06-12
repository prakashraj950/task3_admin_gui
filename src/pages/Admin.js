import axios from "axios";
import React, { Component } from "react";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { data: new FormData(), 
  labelData:{},
};
  }

  onChangehandle=(e) => {
  console.log(e.target.files);
    const files = e.target.files;
    const name = e.target.name;
    const { data } = this.state;
   for( const file of files){
     data.append(name, file);
   }
    
    this.setState({ data });
  };
  

  
    upload=()=>{
    axios.post('http://localhost:8000/upload',this.state.data)
  }

  render() {
    const { photo } = this.state;
   
    
        return (
          <div>
            <img src={photo} width="200" height="200" />
            <input
              type="file"
              name="file"
              multiple
              accept="image/gif, image/png, image/jpeg, image/jpg"
              onChange={this.onChangehandle}
            />
            <button onClick={this.upload}>upload new ad</button>
          </div>
        );

   
}
}

export default Admin;
