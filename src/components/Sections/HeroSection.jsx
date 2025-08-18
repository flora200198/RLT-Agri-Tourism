import React from "react";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleExploreActivities = () => {
    navigate("/activities");
  };
  return (
    <>
      {/* HERO */}
      <section className="position-relative overflow-hidden" style={{ height: "68vh", minHeight: 420 }}>
        {/* Background Video */}
        <video
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover oppacity-75"
          src="/assets/Landing Video.mp4"   // place your file in public/assets/
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25" />

        {/* Overlay Content */}
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3 px-md-5">
          {/* <h1 className="display-5 fw-bold">Welcome to Green Valley Farm</h1> */}
          <p className="lead mb-4">
            Experience nature like never before — fresh air, happy animals, and real
            farm-to-table goodness.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button
              onClick={handleExploreActivities}
              className="btn btn-primary btn-lg"
            >
              Explore Activities
            </button>
            <button className="btn btn-outline-light btn-lg">
              Book a Farm Visit
            </button>
          </div>

          {/* Quick stats */}
          <div className="d-flex gap-4 gap-md-5 justify-content-center mt-4 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-people fs-4" aria-hidden="true"></i>
              <span>10k+ Animals & Trees</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-droplet fs-4" aria-hidden="true"></i>
              <span>Pure & Fresh Milk</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-shield-check fs-4" aria-hidden="true"></i>
              <span>Hygiene Assured</span>
            </div>
          </div>
        </div>
      </section>


      {/* FEATURES STRIP */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <i className="bi bi-leaf fs-1" aria-hidden="true"></i>
              <h6 className="mt-2 mb-1">Naturally Grown</h6>
              <p className="text-muted small mb-0">
                No synthetic additives. Just sunlight, soil, and care.
              </p>
            </div>
            <div className="col-6 col-md-3">
              <i className="bi bi-egg-fried fs-1" aria-hidden="true"></i>
              <h6 className="mt-2 mb-1">Farm Fresh Eggs</h6>
              <p className="text-muted small mb-0">
                Collected daily from free-range hens.
              </p>
            </div>
            <div className="col-6 col-md-3">
              <i className="bi bi-cup-hot fs-1" aria-hidden="true"></i>
              <h6 className="mt-2 mb-1">Pure Desi Ghee</h6>
              <p className="text-muted small mb-0">
                Traditional churned, rich aroma and taste.
              </p>
            </div>
            <div className="col-6 col-md-3">
              <i className="bi bi-truck fs-1" aria-hidden="true"></i>
              <h6 className="mt-2 mb-1">Doorstep Delivery</h6>
              <p className="text-muted small mb-0">
                Freshness delivered, right when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="about-section container py-5">
        {/* <h2 className="text-center mb-4 fw-bold">About Green Valley Naturals</h2> */}
        <p>
          At <strong>Green Valley Naturals</strong>, our vision is to reshape the way
          people connect with nourishment by offering food that is pure, vibrant, and
          rooted in nature. We have taken bold steps as early movers in natural
          farming and continue to champion wholesome living. Our farms are built on a
          foundation that blends ecological care, time-honored methods, and scientific
          insight – ensuring food that is good for the body and kind to the planet.
        </p>
        <p>
          Milk remains one of the rare foods that naturally delivers most of the
          essential nutrients required for growth and well-being.{" "}
          <strong>Green Valley Naturals</strong> is India’s first organic dairy
          collective that unites contemporary practices with ancestral wisdom in
          animal care. For more than a decade, we have followed a unique model of
          checking every drop of milk for purity and safety directly at the farm and
          processing facilities. By keeping away what doesn’t belong, we ensure that
          every product is brimming with natural goodness and flavor. It’s milk the
          way it was meant to be — nourishing, delicious, and sourced from content,
          well-cared-for animals.
        </p>
        <p>
          Our philosophy is simple: cultivate for tomorrow. Along with producing food
          responsibly, we are committed to safeguarding the environment, conserving
          biodiversity, and respecting the delicate balance of ecosystems. Every
          initiative across our farms and facilities is guided by principles of
          sustainability, balance, and long-term health of the soil.
        </p>
        <p>
          At the heart of our movement are our partner farmers. Through
          entrepreneurship and training programs, we empower rural families to thrive,
          honoring their craft and restoring pride in agriculture. Every harvest that
          leaves our farms carries not just nutrition but also the values of honesty,
          care, and respect.
        </p>
        <p>
          No matter where you are on your wellness path, when you welcome{" "}
          <strong>Green Valley Naturals</strong> into your life, you’ll discover food
          that truly nourishes and a way of living that feels deeply rewarding.
        </p>
      </section>
      {/* IMAGE MOSAIC + INFO */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <img
                    src="https://images.unsplash.com/photo-1578301978018-3005759f48d7?q=80&w=1200&auto=format&fit=crop"
                    alt="Happy cows grazing"
                    className="img-fluid rounded-3 shadow-sm"
                  />
                </div>
                <div className="col-6">
                  <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
                    alt="Sun-drenched fields"
                    className="img-fluid rounded-3 shadow-sm"
                  />
                </div>
                <div className="col-12">
                  <img
                    src="/assets/Farm-booking.png"
                    alt="Fresh farm produce in baskets"
                    className="img-fluid rounded-3 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <h2 className="fw-semibold">Book Your Slot</h2>
              <p className="text-muted">
                We’re a family-run farm dedicated to sustainable practices and
                wholesome produce. Visit us for guided tours, animal feeding, and
                hands-on activities tailored for kids and families.
              </p>

              <ul className="list-unstyled">
                <li className="d-flex gap-3 align-items-start mb-2">
                  <i className="bi bi-geo-alt fs-5 mt-1" aria-hidden="true"></i>
                  <span>
                    <strong>Easy to reach:</strong> Just off the main highway, with
                    clear signboards.
                  </span>
                </li>
                <li className="d-flex gap-3 align-items-start mb-2">
                  <i className="bi bi-clock-history fs-5 mt-1" aria-hidden="true"></i>
                  <span>
                    <strong>Flexible timings:</strong> Morning & evening slots for
                    the best farm experience.
                  </span>
                </li>
                <li className="d-flex gap-3 align-items-start mb-2">
                  <i className="bi bi-bag-heart fs-5 mt-1" aria-hidden="true"></i>
                  <span>
                    <strong>Shop on-site:</strong> Fresh milk, ghee, eggs, and
                    seasonal goodies.
                  </span>
                </li>
              </ul>

              <div className="d-flex gap-3 mt-3 flex-wrap">
                <button variant="primary">Plan Your Visit</button>
                <button variant="outline-primary">See Products</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
