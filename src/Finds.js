import React, { Component } from "react";
import FindPoloroid from "./FindPoloroid"

class Finds extends Component {
  constructor(props){
    super(props)

    this.state = {
      finds: [],
      filteredFinds: [],
      userLocation: {},
      stores: [],
      filteredStores: []
    }

  }

  componentDidMount(){
    this.getFinds()
    this.getStores()
  }

  componentDidUpdate(){

  }

  getLocation = () => {
    let url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCLTnIgnmTHVA87V0pTg7n2N2Y6HZxE7hA"
    return fetch(url, {
      method: 'POST'
    })
    .then(result => result.json())
  }

  getFinds = () => {
    let url = "http://localhost:3000/finds"
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({finds: data, filteredFinds: data})
    })
  }

  isLiked = (find_id) => {
    return this.props.likes.includes(find_id)
  }

  displayFinds = () => {
    //if (this.state.finds.length > 0) {
      return this.state.filteredFinds.map((find, index) => {
        let liked = this.isLiked(find.id)
        return <FindPoloroid key={index} isLiked={liked} find={find} likeFind={(id) => this.likeFind(id)}/>
      })
    //}
  }

  brandFilter = (finds, brand) => {
    let brandFiltered = []
    if (brand !== ""){
      finds.forEach(find => {
        if (find.brand === brand) {
          brandFiltered.push(find)
        }
      })
      return brandFiltered
    }
    return finds
  }

  priceFilter = (finds, price) => {
    let priceFiltered = []
    if (price !== ""){
      finds.forEach(find => {
        if (find.price < parseInt(price)) {
          priceFiltered.push(find)
        }
      })
      return priceFiltered
    }
    return finds
  }

  getDistance = () => {
    let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&key=AIzaSyDIfPwIi6IVmHH8WNpQE0q9iLpY1XaB4m0"
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

  getStores = () => {
    let url = "http://localhost:3000/stores"
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({stores: data, filteredStores: data})
    })
  }

  locationFilter = (finds) => {
    this.getLocation()
    .then(data => {
      console.log(data.location)
      let storeFiltered = []
      this.state.filteredFinds.forEach( find => {
        storeFiltered.push()
      })
      //let uniqStoreIds = [... new Set(storeIds)]
      //console.log(uniqStoreIds)

    })
    //this.getDistance()
    return finds
  }

  likeFind = (findId) => {
    console.log(findId)
    console.log(this.props.user.id)
    let url = "http://localhost:3000/likes"
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        find_id: findId
      })})
      .then( res => console.log(res))
  }

  filterFinds = (ev) => {
    ev.preventDefault()

    let brand = ev.target.elements['brandInput'].value
    let price = ev.target.elements['priceInput'].value

    let brand_filtered = this.brandFilter(this.state.finds, brand)
    let price_filtered = this.priceFilter(brand_filtered, price)
    let location_filtered = this.locationFilter(price_filtered)


    this.setState({filteredFinds: price_filtered})

  }

  render (){
    return (
      <div>
        <div className="">
          <form onSubmit={(ev) => this.filterFinds(ev)} className="finds-filters">
            <div className="form-inline">
              <div className="col-2 form-check-inline">
                <input className="form-check-input" name="myLocation" type="checkbox" value="" id="defaultCheck1" />
                <label className="form-check-label text-secondary" >
                  My Location
                </label>
              </div>
              <div className="col">
                <input type="text" className="form-control" name="brandInput" placeholder="Brand:"/>
              </div>
              <div className="col">
                  <select name="priceInput" className="form-control text-secondary">
                    <option value="">Less Than:</option>
                    <option value="100">$100</option>
                    <option value="50">$50</option>
                    <option value="25">$25</option>
                    <option value="15">$15</option>
                    <option value="5">$5</option>
                  </select>
              </div>
              <div className="col">
                 <button type="submit" className="btn btn-primary button">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="row justify-content-center flex main-content">
            {this.displayFinds()}
        </div>
      </div>
    );
  }
}
export default Finds;
