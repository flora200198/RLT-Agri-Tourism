
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './Header.css';

const Header = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [heldIndex, setHeldIndex] = useState(null);

  const navigate = useNavigate();
  
  const navItems = [
    {
      label: "Explore nature with Us",
      options: [
        { label: "Adventures", link: "activities/book", image: '/assets/Adventure.png', type: 'adventure' },
        { label: "Adventures with stay", link: "staying/book", image: '/assets/FarmHouse.png', type: 'stay' },
      ],
    },
    {
      label: "Products",
      options: [
        { label: "Cow Milk", link: "/ProductPage/milk", image:'/assets/Milk.png', type: 'product' },
        { label: "Eggs", link: "/ProductPage/eggs", image:'/assets/Eggs.png', type: 'product' },
        { label: "Chicken", link: "/ProductPage/chicken", image:'/assets/Kadaknath.png', type: 'product' },
        { label: "Duck", link: "/ProductPage/duck", image:'/assets/Duck.png', type: 'product' },
        { label: "Honey", link: "/ProductPage/honey", image:'/assets/Honey.png', type: 'product' },
        { label: "Honey wax", link: "/ProductPage/beeswax", image:'/assets/Bee-wax.png', type: 'product' },
        { label: "Ghee", link: "/ProductPage/ghee", image:'/assets/Ghee.png', type: 'product' },
        { label: "Amla", link: "/ProductPage/amla", image:'/assets/Amla.png', type: 'product' },
        { label: "Guava", link: "/ProductPage/guava", image:'/assets/Guava.png', type: 'product' },
        { label: "Lemon", link: "/ProductPage/lemon", image:'/assets/Lemon.png', type: 'product' },
        { label: "Seasonal Fruits", link: "/ProductPage/fruits", image:'/assets/Fruits.png', type: 'product' },
      ],
    },
    {
      label: "Services",
      options: [
        { label: "Organic Villa", link: "/servicePage/organic-villa", image:'/assets/Organic-villa.png', type: 'product' },
        { label: "Gardening", link: "/servicePage/gardening", image:'/assets/Gardening.png', type: 'product' },
        { label: "Landscaping", link: "/servicePage/landscaping", image:'/assets/Landscaping.png', type: 'product' },
        { label: "Terrace Gardening", link: "/servicePage/terrace-gardening", image:'/assets/Terrace-gardening.png', type: 'product' },
        { label: "Indoor Gardening", link: "/servicePage/indoor-gardening", image:'/assets/Indoor-gardening.png', type: 'product' },
        { label: "Hydroponics", link: "/servicePage/hydroponics", image:'/assets/Hydroponics.png', type: 'product' },
        { label: "Herbal Gardening", link: "/servicePage/herbal-gardening", image:'/assets/Herbal-Gardening.png', type: 'product' },
        { label: "Vertical Gardening", link: "/servicePage/vertical-gardening", image:'/assets/Vertical-gardening.png', type: 'product' },
        { label: "Lab testing", link: "/servicePage/lab-testing", image:'/assets/Lab.png', type: 'product' },
        { label: "Quality Checking", link: "/servicePage/quality-checking", image:'/assets/Quality.png', type: 'product' },
        { label: "Trimming & Pruning", link: "/servicePage/trimming-pruning", image:'/assets/Trimming.png', type: 'product' },
        { label: "Consultation Services", link: "/servicePage/consultation", image:'/assets/Consultation.png', type: 'product' },
      ],
    },
  ];

  // const handleOptionClick = (type, link) => {
  //   // Store the selected type in localStorage or pass as state
  //   localStorage.setItem('selectedBookingType', type);
  //   navigate(link);
  // };

  const handleOptionClick = (type, link) => {
  navigate(link, { state: { bookingType: type } });
};


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
            {/* {navItems.map((item, index) => (
              <li
                key={index}
                className="nav-item dropdown position-static"
                onMouseEnter={() => setOpenIndex(index)}
                onMouseLeave={() => setOpenIndex(null)}
              >
                <span className="nav-link">{item.label}</span>

                <ul
                  className={`dropdown-menu w-100 border-0 shadow p-4 custom-grid-dropdown ${openIndex === index ? "show" : ""}`}
                  style={{
                    left: 0,
                    right: 0,
                    top: "100%",
                  }}
                  data-bs-auto-close="outside"
                >
                  <div className="container">
                    <div className="row g-4">
                      {item.options.map((opt, i) => (
                        <div className="col-6 col-md-3" key={i}>
                          <div
                            onClick={() => handleOptionClick(opt.type, opt.link)}
                            className="dropdown-item d-flex flex-column align-items-center text-center"
                            style={{ padding: "10px", cursor: "pointer" }}
                          >
                            <img
                              src={opt.image}
                              alt={opt.label}
                              style={{
                                width: "100%",
                                height: "140px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                marginBottom: "10px",
                              }}
                            />
                            <span>{opt.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ul>
              </li>
            ))} */}
            {navItems.map((item, index) => (
  <li
    key={index}
    className="nav-item dropdown position-static"
    onMouseEnter={() => {
      if (!heldIndex) setOpenIndex(index); // only open on hover if not held
    }}
    onMouseLeave={() => {
      if (!heldIndex) setOpenIndex(null); // close on hover leave if not held
    }}
  >
    <span
      className="nav-link"
      onClick={() => {
        if (heldIndex === index) {
          // toggle off if already held
          setHeldIndex(null);
          setOpenIndex(null);
        } else {
          // hold open on click
          setHeldIndex(index);
          setOpenIndex(index);
        }
      }}
      style={{ cursor: "pointer" }}
    >
      {item.label}
    </span>

    <ul
      className={`dropdown-menu w-100 border-0 shadow p-4 custom-grid-dropdown ${openIndex === index ? "show" : ""}`}
      style={{
        left: 0,
        right: 0,
        top: "100%",
      }}
      data-bs-auto-close="outside"
    >
      <div className="container">
        <div className="row g-4">
          {item.options.map((opt, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div
                onClick={() => {
                  handleOptionClick(opt.type, opt.link);
                  setOpenIndex(null); // close dropdown after selecting
                  setHeldIndex(null);  // remove hold after selecting
                }}
                className="dropdown-item d-flex flex-column align-items-center text-center"
                style={{ padding: "10px", cursor: "pointer" }}
              >
                <img
                  src={opt.image}
                  alt={opt.label}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
                <span>{opt.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ul>
  </li>
))}

            <li className="nav-item">
              <NavLink end className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
