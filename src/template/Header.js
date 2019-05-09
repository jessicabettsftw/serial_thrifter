import React from "react";
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <nav id="header" className="navbar navbar-expand-lg">
      <Link id="title" className="navbar-brand" to="#">serial thrifter</Link>
      <div className="dropdown-menu">
        <Link id="link" class="dropdown-content" to='/stores'>Stores</Link>
        <Link id="link" class="dropdown-content" to='/finds'>Finds</Link>
        <Link id="link" class="dropdown-content" to='/upload-find'>Upload Find</Link>
        <Link id="link" class="dropdown-content" exact to='/profiles'>Users</Link>
      </div>
    </nav>

    // <div className="header flex justify-content-center">
    //   <h1 id="title">serial thrifter</h1>
    //     <div class="collapse navbar-collapse">
    //       {props.user ?
    //         <ul class="navbar-nav">
    //         <li class="nav-item dropdown">
    //           <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //             Navigation
    //           </a>
    //           <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    //
    //           </div>
    //         </li>
    //           <li class="nav-item">
    //               <Link className="nav-item nav-link" onClick={() => props.signOut()} >Sign Out</Link>
    //           </li>
    //           <li class="nav-item">
    //               <Link id="link" className="nav-item nav-link" to='/user'><img className="avatar" src={props.user.image} alt="user" /></Link>
    //           </li>
    //
    //         </ul>
    //       : <ul class="nav">
    //         <li class="nav-item">
    //           <Link id="link" className="nav-item nav-link" to='/'>Home</Link>
    //         </li></ul>}
    //     </div>
    //   </div>
  );
};

export default Header;
