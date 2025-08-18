import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">My Farm</Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/farm-visit">Farm Visit</NavLink>
            </li>

            {/* Products dropdown */}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="productsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Products
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="productsDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/products/ghee">Chicken</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/products/milk">Milk</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/products/milk">Honey</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/products/milk">Honey Wax</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/products/milk">Guava</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/products/milk">Amla</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/products/milk">Lemon</NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/products/eggs">Eggs</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
