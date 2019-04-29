import React from "react";

const Header = props => {
  return (
    <div className="header">
      <h1 className="title" href="#">serial thrifter</h1>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav links">
            <a className="nav-item nav-link" href="/">Home</a>
            <a className="nav-item nav-link" href="/finds">Finds</a>
            <a className="nav-item nav-link" href="/stores">Stores</a>
          </div>
        </div>
      </nav>

    </div>

  );
};

export default Header;
