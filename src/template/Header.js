import React from "react";
import { Navbar, NavLink, NavItem } from "reactstrap";

const Header = props => {
  return (
    <Navbar color="light" light expand="md" className="header">
      <h1 className="title">serial thrifter</h1>
        <NavItem>
          <NavLink href="/finds">Finds</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/find_stores">Stores near me</NavLink>
        </NavItem>
    </Navbar>
  );
};

export default Header;
