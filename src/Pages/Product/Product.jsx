// ProductsSection.jsx
import React from "react";
import { useMemo } from "react";
import PRODUCTS from "./ProductsData";
import { Link, useParams } from "react-router-dom";


const ProductsSection = () => {
    // const { slug } = useParams();
    // const product = useMemo(
    //     () => PRODUCTS.find((p) => p.slug === slug),
    //     [slug]
    // );
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
                    {PRODUCTS.map((p, idx) => (
                        <div className="col-sm-6 col-lg-4" key={idx}>
                            <Link
                                to={`/productPage/${p.slug}`}
                                className="text-decoration-none text-dark"
                            >
                                <div className="card h-100 border-0 shadow-sm">
                                    <img
                                        src={p.heroImg}
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
                                                {p.variants.map(v => v.label).join(", ")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
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
