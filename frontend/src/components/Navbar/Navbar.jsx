import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/Cart";

const Navbar = () => {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);

  const openSidebar = () => {
    setSidebarDisplay(true);
  };
  const closeSidebar = () => {
    setSidebarDisplay(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };

  const foodItems = useCart().state;
  return (
    <>
      <div className={`sidebar ${sidebarDisplay && "sidebar-display"}`}>
        <h1>ExpressEats</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#000000"
          className="close-btn"
          onClick={closeSidebar}
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>

        {!localStorage.getItem("authToken") ? (
          <ul>
            <li>
              <Link to="/" className="side-btn">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/log-in" className="side-btn">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/sign-up" className="side-btn">
                Sign Up
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/" className="side-btn">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/cart" className="side-btn">
                Cart
                <b style={{ color: "red" }}>
                  {foodItems.length !== 0 ? foodItems.length : ""}
                </b>
              </Link>
            </li>
            <li>
              <Link to="/orders" className="side-btn">
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/log-in"
                className="side-btn btn btn-danger"
                onClick={handleLogout}
              >
                Log Out
              </Link>
            </li>
          </ul>
        )}
      </div>

      <nav>
        <div className="left-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            fill="#e8eaed"
            className="menu-btn"
            onClick={openSidebar}
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
          <Link to="/" className="home-butn">
            HOME
          </Link>
        </div>

        {!localStorage.getItem("authToken") ? (
          <ul className="right-nav">
            <li>
              <Link to="/log-in" className="login-btn">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/sign-up" className="signup-btn">
                Sign Up
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="right-nav">
            <li>
              <Link to="/cart" className="login-btn">
                Cart{" "}
                <b style={{ color: "red" }}>
                  {foodItems.length !== 0 ? foodItems.length : ""}
                </b>
              </Link>
            </li>
            <li>
              <Link to="/orders" className="login-btn">
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/log-in"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Log Out
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
