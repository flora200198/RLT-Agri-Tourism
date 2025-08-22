import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";


const Header = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navItems = [
    { label: "Explore nature with Us",
    options: [
      { label: "Adventures", link: "/book" },
      { label: "Adventures with saty", link: "/book" },
    ], },
    { label: "Products", options: [
  { label: "Cow Milk", link: "/ProductPage/milk" },
  { label: "Eggs", link: "/ProductPage/eggs" },
  { label: "Chicken", link: "/ProductPage/chicken" },
  { label: "Duck", link: "/ProductPage/duck" },
  { label: "Honey", link: "/ProductPage/honey" },
  { label: "Honey wax", link: "/ProductPage/beeswax" },
  { label: "Ghee", link: "/ProductPage/ghee" },
  { label: "Amla", link: "/ProductPage/amla" },
  { label: "Guava", link: "/ProductPage/guava" },
  { label: "Lemon", link: "/ProductPage/lemon" },
  { label: "Seasonal Fruits", link: "/ProductPage/fruits" },
  // { label: "Coconut", link: "/ProductPage/coconut" },
], },
  ];

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
              <NavLink className="nav-link" to="/products">Farm Fresh</NavLink>
            </li>
            {navItems.map((item, index) => (
              <li
                key={index}
                className="nav-item dropdown"
                onMouseEnter={() => setOpenIndex(index)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                <a className="nav-link dropdown-toggle" href="#">
                  {item.label}
                </a>
                <ul className={`dropdown-menu ${openIndex === index ? "show" : ""}`}>
                  {item.options.map((opt, i) => (
                    <li key={i}>
                      <NavLink className="dropdown-item" to={opt.link}>
            {opt.label}
          </NavLink>
                    </li>
                  ))}

                </ul>
              </li>
            ))}
            <li className="nav-item">
              <NavLink end className="nav-link" to="/con">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
