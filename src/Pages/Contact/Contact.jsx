import React, { useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" data-aos="fade-down">
        Contact Us
      </h2>
      <div className="row">
        {/* Left Side - Company Details */}
        <div className="col-md-6 mb-4" data-aos="fade-right">
          <h4 className="mb-3">Our Office</h4>
          <p>
            <FaMapMarkerAlt className="text-primary me-2" />
            <strong>RL Technologies Pvt Ltd</strong>
          </p>
          <p>123 Business Park, Hyderabad, Telangana - 500081</p>
          <p>
            <FaPhoneAlt className="text-success me-2" />
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p>
            <FaEnvelope className="text-danger me-2" />
            <strong>Email:</strong> info@rltechnologies.com
          </p>
          <p>
            <FaClock className="text-warning me-2" />
            <strong>Working Hours:</strong> Mon - Sat (9:00 AM - 6:00 PM)
          </p>
        </div>

        {/* Right Side - Contact Form */}
        <div className="col-md-6" data-aos="fade-left">
          {/* <h4 className="mb-3">Send us a Message</h4> */}
          <form className="shadow p-4 rounded bg-light">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your phone number"
                required
              />
            </div>
            {/* <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div> */}
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              data-aos="zoom-in"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
