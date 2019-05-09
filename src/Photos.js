import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FindPoloroid from "./FindPoloroid";

class Profile extends Component {

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    //console.log(ev.target.elements['file'].files[0])
    let file = ev.target.elements['file'].files[0]

    this.getBase64(file)
    .then( myfile => {
      console.log(myfile)
      let url = `https://serialthrifterbackend.herokuapp.com/photos`
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
          // 'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify({'file': myfile, 'name':file.name})})
        .then( res => {
          console.log(res)
          return res.json()
        })
        .then(data => {
          console.log(data.public_url)
        })
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
