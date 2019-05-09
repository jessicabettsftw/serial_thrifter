import React from "react";
import unliked from "./images/unliked.jpg";
import liked from "./images/liked.jpg";

const FindPoloroid = props => {
  return (
    <div className="small-poloroid justify-content-center" >
      <div onClick={() => props.selectFind(props.find.id)}><img src={props.find.photo} alt="find" className="small-poloroid-img"/></div>
      <span className="lit">{props.isLiked.toString() === "true" ? <span role="img" alt="liked" onClick={() => props.unlikeFind(props.find.id)}><img src={liked} alt="liked" /></span> : <span onClick={() => props.likeFind(props.find.id)}><img src={unliked} alt='liked' /></span>}</span>
      <span className="price">${props.find.price}</span>
    </div>
  );
};

export default FindPoloroid;
