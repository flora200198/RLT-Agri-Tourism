import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { PostContactForm } from '../../services/Api';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(null);
  setError(null);

  try {
    await PostContactForm(form);
    console.log("Form submitted:", form);
    setSuccess('Message sent successfully!');
    setForm({ name: '', phone: '', message: '' });
  } catch (err) {
  if (err.response) {
    // Server responded but with a status error (400, 500, etc.)
    console.error("Backend error:", err.response.data);
    setError(err.response.data.message || "Server returned an error");
  } else if (err.request) {
    // Request was made but no response received
    console.error("No response from backend:", err.request);
    setError("No response from server. Check if backend is running.");
  } else {
    // Something else went wrong
    console.error("Error setting up request:", err.message);
    setError("Something went wrong.");
  }
  } finally {
    setLoading(false);
  }
};

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const result = await PostContactForm({
//       name: "flora",
//       phone: "09080902615",
//       message: "Hello"
//     });
//     console.log("Form submitted:", result);
//   } catch (err) {
//     console.error("Submit failed:", err);
//   }
// };


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
          <form className="shadow p-4 rounded bg-light" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
