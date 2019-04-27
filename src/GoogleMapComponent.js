import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '50%',
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      centerPoint: {lat: 47.49855629475769, lng: -122.14184416996333},
      clickedStore: {}
    }
    this.getStores("black diamond washington")
  }

  getStores = (location) => {
    let url = ""
    if ((typeof location) === "string") {
      url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=thrift_store&location=${location}&limit=30&radius=20000`
    } else {
      url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=thrift_store&longitude=${location.lng}&latitude=${location.lat}&limit=30&radius=20000`

    }

    fetch(url, {
      'headers': {
        'Authorization': "Bearer GeTWZrzUC-yLbRt8--5cYSypgjILaAFpYIMpC6xpgXMxwk86EQcmhzo51ZJPpBzEwdFBFYd_hXZwTIU4hwyzDqI9bcPyhyw9iBnXwwlSlJ2nSJBElOpVDhsXEP69XHYx"
      }
    })
    .then(resp => resp.json())
    .then(data => {
      let center = this.findCenterPoint(data)
      this.setState({stores: data.businesses, centerPoint: center})
    })
  }

  findCenterPoint = (data) => {
    //console.log(data.businesses)
      let latitude = 0
      let longitude = 0
      data.businesses.forEach(store => {
        latitude += store.coordinates.latitude
        longitude += store.coordinates.longitude
      })
      let avgLat = latitude / data.businesses.length
      let avgLong = longitude / data.businesses.length
      return {lat: avgLat, lng: avgLong}
  }

  getStoreInfo = (obj) => {
    console.log(this.state.stores[obj])
    this.setState({clickedStore: this.state.stores[obj]})
  }

  getLocation = () => {
    console.log("getting location")
    let url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCLTnIgnmTHVA87V0pTg7n2N2Y6HZxE7hA"
    fetch(url, {
      method: 'POST'
    })
    .then(result => result.json())
    .then(data =>{
      console.log(data.location)
      this.getStores(data.location)
    })
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.coordinates.latitude,
       lng: store.coordinates.longitude
     }}
     onClick={(obj) => this.getStoreInfo(obj.id)} />
    })
  }

  displayStores = () => {
    return this.state.stores.map((store, index) => {
      return <li >{store.name}</li>
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    if (ev.target.elements['myLocation'].checked === true){
      this.getLocation()
    } else {
      this.getStores(ev.target.elements['cityInput'].value)
    }
  }

  clearForm = (ev) => {
    if (ev.target.checked){
      document.getElementsByName('cityInput')[0].value = ""
    }
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={(ev) => this.handleSubmit(ev)}>
            <label>City & State: </label>
            <input name="cityInput" type="text" />
            <label>My Location:</label>
            <input type="checkbox" name="myLocation" onChange={(ev) => this.clearForm(ev)}/>
            <input type="submit" />
          </form>
        </div>
        <div>
          <div >
            <p>
              Name: {this.state.clickedStore.name}
            </p>
            <p>
              Phone: {this.state.clickedStore.display_phone}
            </p>
            <p>
              Rating: {this.state.clickedStore.rating}
            </p>

          </div>
          <div>
            <ul>
              {this.displayStores()}
            </ul>
          </div>
          <div>
            <Map
              google={this.props.google}
              zoom={9}
              style={mapStyles}
              center={this.state.centerPoint}
            >
            {this.displayMarkers()}
            </Map>
          </div>

        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDIfPwIi6IVmHH8WNpQE0q9iLpY1XaB4m0'
})(MapContainer);

// alias: "goodwill-industries-maple-valley"
// categories: [{…}]
// coordinates: {latitude: 47.359423, longitude: -122.021071}
// display_phone: "(425) 433-1566"
// distance: 1949.9184114787333
// id: "3cWo4U0v2i9XL01Tcfthjg"
// image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/XUhcnq_9uZ0oJT3j3DOpFQ/o.jpg"
// is_closed: false
// location: {address1: "27077 Black Diamond Rd SE", address2: "", address3: "", city: "Maple Valley", zip_code: "98038", …}
// name: "Goodwill Industries"
// phone: "+14254331566"
// price: "$"
// rating: 2.5
// review_count: 25
// transactions: []
// url: "https://www.yelp.com/biz/goodwill-industries-maple-valley?adjust_creative=GzJl9WKjHSYRLS9v-F5pDA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=GzJl9WKjHSYRLS9v-F5pDA"
// __proto__: Object
