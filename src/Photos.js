import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FindPoloroid from "./FindPoloroid";

class Profile extends Component {

  getBase64 = (file) => {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

  handleSubmit = (ev) => {
    ev.preventDefault()
    console.log(ev.target.elements['file'].files[0])
    let file = this.getBase64(ev.target.elements['file'].files[0])
    console.log(file)
    let url = "https://serialthrifterbackend.herokuapp.com/photos"
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: file})
      .then( res => res.json())
      .then(data => {
        console.log(data)
      })
  }

  render(){
      return (
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input name="file" type="file" />
          <input type="submit" />
        </form>
      )
  }
}

export default Profile;
