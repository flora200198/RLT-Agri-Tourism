// ServicesSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ServicesMenu } from "./ServicesData";

const ServicesSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold">🌱 Our Services</h2>
          <p className="text-muted">
            Discover our range of sustainable farming and gardening services —
            tailored to bring nature closer to your home and ensure quality from
            soil to table.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {ServicesMenu.options.map((service, idx) => (
            <div className="col-sm-6 col-lg-4" key={idx}>
              <Link
                to={service.link}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={service.image}
                    alt={service.label}
                    className="card-img-top"
                    style={{
                      objectFit: "contain",
                      height: "200px",
                      width: "100%",
                      backgroundColor: "#f8f9fa",
                      padding: "10px",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title d-flex align-items-center">
                      <i className="bi bi-gear text-success me-2 fs-5" />
                      {service.label}
                    </h5>
                    <p className="card-text small flex-grow-1">
                      {/* Short description (you can expand this in ServicesData.js later) */}
                      Explore our <strong>{service.label}</strong> service and
                      experience professional care with sustainable practices.
                    </p>
                    <p className="fw-semibold text-success small mt-auto">
                      {service.type.toUpperCase()}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-5 text-center">
          <h3 className="h5">💬 What Our Clients Say</h3>
          <p className="text-muted">
            “Their gardening services transformed our space beautifully —
            professional, eco-friendly, and reliable.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
