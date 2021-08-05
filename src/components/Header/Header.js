import { Avatar } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Riview</Link>
        <Link to="/inventory">Manage Inventory here</Link>
        <button onClick={() => setLoggedInUser({})}>Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
