import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">My Farm</h5>
            <p>
              123 Green Valley Road <br />
              Pooriyambakkam, Tamil Nadu 600001 <br />
              India
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i> +91 98765 43210 <br />
              <i className="bi bi-envelope-fill me-2"></i> info@myfarm.com
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">  Home</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><Link to="/activities/book" className="text-light text-decoration-none">Farm Visit</Link></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Products */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Our Products</h6>
            <ul className="list-unstyled">
              <li><a href="/products/milk" className="text-light text-decoration-none">Organic Milk</a></li>
              <li><a href="/products/ghee" className="text-light text-decoration-none">Pure Ghee</a></li>
              <li><a href="/products/eggs" className="text-light text-decoration-none">Farm Eggs</a></li>
              <li><a href="/products/vegetables" className="text-light text-decoration-none">Fresh Vegetables</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-light my-4" />
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} My Farm. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
