import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  'width': '400px',
  'height': '400px'
};

class Store extends Component {
  constructor(props){
    super(props)

    this.state = {
      centerPoint: {lat: 47.49855629475769, lng: -122.14184416996333}
    }
  }

  displayMarker = () => {
    if (this.props.selectedStore !== undefined){
      return <Marker id={0} position={{
       lat: this.props.selectedStore.latitude,
       lng: this.props.selectedStore.longitude
     }} />
    }
  }

  render(){
    return (this.props.selectedStore === undefined) ? (<Redirect to="/" />):(
      <div id="find" className="row">
        <div className="col text-align-left lrg-info">
          <p>
            Name: {this.props.selectedStore.name}
          </p>
          <p>
            Address: {this.props.selectedStore.street}, {this.props.selectedStore.city}, {this.props.selectedStore.state}, {this.props.selectedStore.zip}
          </p>
          <p>
            Phone: {this.props.selectedStore.phone_number}
          </p>
          <p>
            coords: {this.props.selectedStore.latitude},{this.props.selectedStore.latitude}
          </p>
        </div>
        {/*<div className="col-2 ">
          <ul className="stores-list">
            {this.displayStores()}
          </ul>
        </div>*/}
      <div className="col lrg-info">
        <Map
          google={this.props.google}
          zoom={3}
          style={mapStyles}
          center={this.state.centerPoint}
        >
        {this.displayMarker()}
        </Map>
      </div>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDIfPwIi6IVmHH8WNpQE0q9iLpY1XaB4m0'
})(Store);
