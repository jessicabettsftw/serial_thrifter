import React, { Component } from "react";
import FindPoloroid from "./FindPoloroid";
import { Redirect } from "react-router-dom";

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
    this.getFinds()
    //this.getStores()
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
      this.setState({
        filteredFinds: data.finds,
        finds: data.finds
      })
    })
  }

  isLiked = (find_id) => {
    return this.props.likes.map(find => find.find_id).includes(find_id)
  }

  displayFinds = () => {
      return this.state.filteredFinds.map((find, index) => {
        let liked = this.isLiked(find.id)
        return <FindPoloroid selectFind={(id) => this.props.selectFind(id)} key={index} isLiked={liked} find={find} unlikeFind={(id) => this.unlikeFind(id)} likeFind={(id) => this.likeFind(id)}/>
      })
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
      this.setState({stores: data, filteredStores: data})
    })
  }

  locationFilter = (finds) => {
    this.getLocation()
    .then(data => {
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
    if (this.isLiked(findId) === false){
      let url = "http://localhost:3000/likes"
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "user_id": this.props.user.id,
          "find_id": findId
        })})
        .then( res => res.json())
        .then(data => {
          this.props.addLike(data)
        })
    }
  }

    unlikeFind = (findId) => {
      if (this.isLiked(findId)){
        let url = `http://localhost:3000/likes/user/${this.props.user.id}/find/${findId}`
        fetch(url, {
          method: "DELETE"})
          .then( this.props.removeLike(findId))
        }
    }

  filterFinds = (ev) => {
    ev.preventDefault()

    let brand = ev.target.elements['brandInput'].value
    let price = ev.target.elements['priceInput'].value

    let brand_filtered = this.brandFilter(this.state.finds, brand)
    let price_filtered = this.priceFilter(brand_filtered, price)
    //let location_filtered = this.locationFilter(price_filtered)


    this.setState({filteredFinds: price_filtered})

  }

  

  render (){
    return (this.props.selectedFind !== undefined) ? (
      <Redirect to="/find" />
    ) : (
      <div>
        <div className="">
          <form onSubmit={(ev) => this.filterFinds(ev)} className="finds-filters">
            <div className="row form-inline justify-content-center">
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
