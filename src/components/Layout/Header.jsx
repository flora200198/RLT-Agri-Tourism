// import React from "react";
// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import './Header.css';


// const Header = () => {
//   const [openIndex, setOpenIndex] = useState(null);
//   const navItems = [
//   {
//     label: "Explore nature with Us",
//     options: [
//       { label: "Adventures", link: "/book", image: '/assets/Adventure.png', type: 'adventure' },
//       { label: "Adventures with stay", link: "/book", image: '/assets/FarmHouse.png', type: 'stay' },
//     ],
//   },
//   {
//     label: "Products",
//     options: [
//       { label: "Cow Milk", link: "/ProductPage/milk", image:'/assets/Milk.png', type: 'product' },
//       { label: "Eggs", link: "/ProductPage/eggs", image:'/assets/Eggs.png', type: 'product' },
//       { label: "Chicken", link: "/ProductPage/chicken", image:'/assets/Kadaknath.png', type: 'product' },
//       { label: "Duck", link: "/ProductPage/duck", image:'/assets/Duck.png', type: 'product' },
//       { label: "Honey", link: "/ProductPage/honey", image:'/assets/Honey.png', type: 'product' },
//       { label: "Honey wax", link: "/ProductPage/beeswax", image:'/assets/Bee-wax.png', type: 'product' },
//       { label: "Ghee", link: "/ProductPage/ghee", image:'/assets/Ghee.png', type: 'product' },
//       { label: "Amla", link: "/ProductPage/amla", image:'/assets/Amla.png', type: 'product' },
//       { label: "Guava", link: "/ProductPage/guava", image:'/assets/Guava.png', type: 'product' },
//       { label: "Lemon", link: "/ProductPage/lemon", image:'/assets/Lemon.png', type: 'product' },
//       { label: "Seasonal Fruits", link: "/ProductPage/fruits", image:'/assets/Fruits.png', type: 'product' },
//       // { label: "Coconut", link: "/ProductPage/coconut", type: 'product' },
//     ],
//   },
// ];


//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container">
//         <Link className="navbar-brand fw-semibold" to="/">My Farm</Link>

//         {/* Mobile toggle */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#mainNavbar"
//           aria-controls="mainNavbar"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Links */}
//         <div className="collapse navbar-collapse" id="mainNavbar">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <NavLink end className="nav-link" to="/">Home</NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink className="nav-link" to="/about">About</NavLink>
//             </li>
//             <li>
//               <NavLink className="nav-link" to="/activities">Activities</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/products">Farm Fresh</NavLink>
//             </li>
//  {navItems.map((item, index) => (
//   <li
//     key={index}
//     className="nav-item dropdown position-static" // ✅ important: removes relative positioning
//     onMouseEnter={() => setOpenIndex(index)}
//     onMouseLeave={() => setOpenIndex(null)}
//   >
//     <span className="nav-link">{item.label}</span>

//     <ul
//       className={`dropdown-menu w-100 border-0 shadow p-4 custom-grid-dropdown ${openIndex === index ? "show" : ""}`}
//       style={{
//         left: 0,      // ✅ start from left
//         right: 0,     // ✅ stretch to right
//         top: "100%",  // ✅ directly below navbar
//       }}
//       data-bs-auto-close="outside"
//     >
//       <div className="container">
//         <div className="row g-4">
//           {item.options.map((opt, i) => (
//             <div className="col-6 col-md-3" key={i}> {/* 4 per row on desktop */}
//               <NavLink
//                 to={opt.link}
//                 onClick={() => setOpenIndex(null)}
//                 className="dropdown-item d-flex flex-column align-items-center text-center"
//                 style={{ padding: "10px" }}
//               >
//                 <img
//                   src={opt.image}
//                   alt={opt.label}
//                   style={{
//                     width: "100%",
//                     height: "140px",
//                     objectFit: "cover",
//                     borderRadius: "10px",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <span>{opt.label}</span>
//               </NavLink>
//             </div>
//           ))}
//         </div>
//       </div>
//     </ul>
//   </li>
// ))}

//             <li className="nav-item">
//               <NavLink end className="nav-link" to="/contact">Contact</NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './Header.css';

const Header = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  
  const navItems = [
    {
      label: "Explore nature with Us",
      options: [
        { label: "Adventures", link: "/book", image: '/assets/Adventure.png', type: 'adventure' },
        { label: "Adventures with stay", link: "/book", image: '/assets/FarmHouse.png', type: 'stay' },
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
  ];

  const handleOptionClick = (type, link) => {
    // Store the selected type in localStorage or pass as state
    localStorage.setItem('selectedBookingType', type);
    navigate(link);
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
            {navItems.map((item, index) => (
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
