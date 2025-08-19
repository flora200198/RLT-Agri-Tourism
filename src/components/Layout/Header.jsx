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
            <li>
              <NavLink className="nav-link" to="/activities">Activities</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/book">Farm Visit</NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/products">Farm Fresh</NavLink>
            </li>

            {/* Products dropdown */}
            <li className="nav-item dropdown">
              {/* Use a plain <a> or <button> for Bootstrap dropdown toggler */}
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="productsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()}
              >
                Products
              </a>
              <ul className="dropdown-menu" aria-labelledby="productsDropdown">
                <li><Link className="dropdown-item" to="/productPage/chicken">Chicken</Link></li>
                <li><Link className="dropdown-item" to="/productPage/milk">Cow Milk</Link></li>
                <li><Link className="dropdown-item" to="/productPage/honey">Honey</Link></li>
                <li><Link className="dropdown-item" to="/productPage/beeswax">Bee Wax</Link></li>
                <li><Link className="dropdown-item" to="/productPage/eggs">Eggs</Link></li>
                <li><Link className="dropdown-item" to="/productPage/duck">Duck</Link></li>
                <li><Link className="dropdown-item" to="/productPage/fish">Fish</Link></li>
                <li><Link className="dropdown-item" to="/productPage/fruits">Fruits</Link></li>
                {/* Optional individual fruits */}
                <li><Link className="dropdown-item" to="/productPage/guava">Guava</Link></li>
                <li><Link className="dropdown-item" to="/productPage/amla">Amla</Link></li>
                <li><Link className="dropdown-item" to="/productPage/lemon">Lemon</Link></li>
                <li><Link className="dropdown-item" to="/productPage/ghee">Ghee</Link></li>
              </ul>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
