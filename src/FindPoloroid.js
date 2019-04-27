import React from "react";
import converse from "./images/converse.png"

const FindPoloroid = props => {
  return (
    <div className="small-poloroid" onClick={() => console.log(props.isLiked)}>
      <img src={converse} alt="find"/>
      <span>${props.find.price}.00</span><br></br>
      <span>{props.isLiked.toString()}</span>
    </div>
  );
};

export default FindPoloroid;
