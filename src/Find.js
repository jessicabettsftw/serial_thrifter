import React, { Component } from "react";

class Find extends Component {
  constructor(props){
    super(props)

    this.state = {
      find: {}
    }
    this.getFind(this.props.findId)
  }

  getFind = (id) => {
    let url = `http://localhost:3000/finds/${id}`
    return fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({find: data})
    })
  }

  render(){
    return(
      <div>
      <p>Id:{this.state.find.id} </p>
      <p>${this.state.find.price}.00</p>
      <p>Desc: {this.state.find.description}</p>
      <p>Store ID: {this.state.find.store_id}</p>
      <p>User ID: {this.state.find.user_id}</p>
      <img src={this.state.find.image} alt="find" />
      </div>

    )
  }
}

export default Find;
