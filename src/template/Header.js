import React from "react";

const Header = props => {
  return (
    <div className="header">
      <h1 class="title" href="#">serial thrifter</h1>
      <nav class="navbar navbar-expand-lg">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav links">
            <a class="nav-item nav-link" href="/">Home</a>
            <a class="nav-item nav-link" href="/finds">Finds</a>
            <a class="nav-item nav-link" href="/stores">Stores</a>
          </div>
        </div>
      </nav>

    </div>

  );
};

export default Header;
