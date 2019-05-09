import React from "react";
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <div className="header">
      <h1 className="title" href="#">serial thrifter</h1>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {props.user ?
          <div className="navbar-nav links">
            <Link className="nav-item nav-link" to='/stores'>Stores</Link>
            <Link className="nav-item nav-link" to='/finds'>Finds</Link>
            <Link className="nav-item nav-link" to='/upload-find'>Upload Find</Link>
            <Link className="nav-item nav-link" exact to='/profiles'>Users</Link>
            <Link className="nav-item nav-link" to='/user'><img className="avatar" src={props.user.image} alt="user" /></Link>
          </div>
          : <div className="navbar-nav links float-left">
            <Link className="nav-item nav-link" to='/'>Home</Link>
          </div>}
        </div>
      </nav>

    </div>

  );
};

export default Header;
