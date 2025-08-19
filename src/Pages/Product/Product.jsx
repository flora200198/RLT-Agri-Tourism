// ProductsSection.jsx
import React from "react";
import { Link } from "react-router-dom";


const ProductsSection = () => {
  const products = [
    {
      name: "Farm Fresh Eggs",
      desc: "Collected daily from free-ranging hens, rich in protein and natural goodness.",
      variants: "Available in 2 tray sizes",
      icon: "bi-egg-fried",
      img: "https://via.placeholder.com/400x250?text=Eggs",
    },
    {
      name: "Cow Milk",
      desc: "Pure, chemical-free milk from grass-fed cows. Delivered fresh within hours of milking.",
      variants: "Available in 2 variants",
      icon: "bi-cup-straw",
      img: "https://via.placeholder.com/400x250?text=Cow+Milk",
    },
    {
      name: "Pure Ghee",
      desc: "Traditional slow-cooked ghee with authentic taste, free from preservatives.",
      variants: "Available in 1L & 500ml packs",
      icon: "bi-droplet-half",
      img: "https://via.placeholder.com/400x250?text=Ghee",
    },
    {
      name: "Raw Honey",
      desc: "100% raw and unprocessed honey, sourced directly from our hives, rich in antioxidants.",
      variants: "Available in 2 variants",
      icon: "bi-bee",
      img: "https://via.placeholder.com/400x250?text=Honey",
    },
    {
      name: "Bee Wax",
      desc: "Naturally harvested beeswax, perfect for candles, cosmetics, and wellness uses.",
      variants: "Natural blocks & rolls",
      icon: "bi-brightness-high",
      img: "https://via.placeholder.com/400x250?text=Bee+Wax",
    },
    {
      name: "Fresh Chicken",
      desc: "Naturally raised, antibiotic-free chicken with rich flavor and tenderness.",
      variants: "Whole & Cut options",
      icon: "bi-basket2",
      img: "https://via.placeholder.com/400x250?text=Chicken",
    },
    {
      name: "Farm Duck",
      desc: "Nutritious, free-range ducks raised in natural ponds for rich meat and eggs.",
      variants: "Whole & Fresh cuts",
      icon: "bi-droplet",
      img: "https://via.placeholder.com/400x250?text=Duck",
    },
    {
      name: "Fresh Fish",
      desc: "Naturally grown in clean ponds, providing chemical-free, protein-rich fish.",
      variants: "Multiple varieties",
      icon: "bi-water",
      img: "https://via.placeholder.com/400x250?text=Fish",
    },
    {
      name: "Seasonal Fruits",
      desc: "Hand-picked, naturally grown fruits directly from our orchards, rich in nutrients.",
      variants: "Available seasonally",
      icon: "bi-apple",
      img: "https://via.placeholder.com/400x250?text=Fruits",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold">
            🌿 Products We Are Proud to Serve You
          </h2>
          <p className="text-muted">
            From our farm to your table — pure, organic, and naturally grown
            produce crafted with love and care.
          </p>
        </div>

        <div className="row g-4">
          {products.map((p, idx) => (
            <div className="col-sm-6 col-lg-4" key={idx}>
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={p.img}
                  alt={p.name}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title d-flex align-items-center">
                    <i className={`bi ${p.icon} text-success me-2 fs-5`} />
                    {p.name}
                  </h5>
                  <p className="card-text small flex-grow-1">{p.desc}</p>
                  {p.variants && (
                    <p className="fw-semibold text-success small">
                      {p.variants}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Testimonials placeholder */}
        <div className="mt-5 text-center">
          <h3 className="h5">💬 What Our Customers Say</h3>
          <p className="text-muted">
            “Visiting the farm and buying directly has been a refreshing
            experience — healthy, pure, and full of goodness!”
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
