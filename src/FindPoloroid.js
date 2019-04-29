import React from "react";
import converse from "./images/converse.png"
import notLiked from "./images/flame.png"

const FindPoloroid = props => {
  return (
    <div className="small-poloroid justify-content-center" >
      <div onClick={() => props.selectFind(props.find.id)}><img src={converse} alt="find" className="small-poloroid-img"/></div>
      <span>${props.find.price}.00</span><br></br>
      <span>{props.isLiked.toString() === "true" ? <span role="img" alt="liked" onClick={() => props.unlikeFind(props.find.id)}>🔥</span> : <img src={notLiked} alt="not liked" onClick={() => props.likeFind(props.find.id)} />}</span>
    </div>
  );
};

export default FindPoloroid;
