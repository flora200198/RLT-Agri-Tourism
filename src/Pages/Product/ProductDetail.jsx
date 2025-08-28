// ProductPage.jsx
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import PRODUCTS from "./ProductsData";

export default function ProductPage() {
  const { slug } = useParams();
  const product = useMemo(
    () => PRODUCTS.find((p) => p.slug === slug),
    [slug]
  );

  if (!product) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <h1 className="h4 mb-3">Product not found</h1>
          <Link to="/products" className="btn btn-success">
            View All Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section
        className="position-relative text-white"
        style={{
          backgroundImage: `url(${product.heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 260,
        }}
      >
        <div
          className="w-100 h-100"
          style={{ backdropFilter: "brightness(0.6)" }}
          aria-hidden="true"
        />
        <div className="container position-absolute top-50 start-50 translate-middle">
          <div className="text-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/products">Products</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>

            <h1 className="display-6 fw-bold">{product.name}</h1>
            <img src={product.heroImg} alt={product.name} className="mb-3" style={{ width: 60, height: 60 }} />
            <p className="lead">{product.short}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {/* Highlights & Variants */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h2 className="h5 mb-3">Why you’ll love it</h2>
                  <ul className="list-unstyled m-0">
                    {product.highlights?.map((h, i) => (
                      <li key={i} className="d-flex align-items-start mb-2">
                        <i className="bi bi-check2-circle text-success me-2 fs-5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Accordions */}
              <div className="accordion" id="productAccordions">
                {/* Process */}
                {product.accordions?.process && (
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingProcess">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseProcess"
                        aria-expanded="true"
                        aria-controls="collapseProcess"
                      >
                        Farm to Customer
                      </button>
                    </h2>
                    <div
                      id="collapseProcess"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingProcess"
                      data-bs-parent="#productAccordions"
                    >
                      <div className="accordion-body">
                        {product.accordions.process}
                      </div>
                    </div>
                  </div>
                )}

                {/* Usage */}
                {product.accordions?.usage && (
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingUsage">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseUsage"
                        aria-expanded="false"
                        aria-controls="collapseUsage"
                      >
                        Usage & Storage
                      </button>
                    </h2>
                    <div
                      id="collapseUsage"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingUsage"
                      data-bs-parent="#productAccordions"
                    >
                      <div className="accordion-body">
                        <ul className="mb-0">
                          {product.accordions.usage.map((u, i) => (
                            <li key={i}>{u}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Availability */}
                {product.accordions?.availability && (
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingAvail">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseAvail"
                        aria-expanded="false"
                        aria-controls="collapseAvail"
                      >
                        Availability
                      </button>
                    </h2>
                    <div
                      id="collapseAvail"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingAvail"
                      data-bs-parent="#productAccordions"
                    >
                      <div className="accordion-body">
                        {product.accordions.availability}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order / Variants / Nutrition */}
            <div className="col-lg-5">
              {/* Variants */}
              {product.variants?.length ? (
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h2 className="h6 mb-3">Select Variant</h2>
                    <div className="vstack gap-2">
                      {product.variants.map((v) => (
                        <div
                          key={v.label}
                          className="d-flex justify-content-between align-items-center p-3 border rounded-3"
                        >
                          <span className="fw-semibold">{v.label}</span>
                          <span className="text-success fw-bold">
                            ₹ {v.price}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="d-grid mt-3">
                      <a
                        href="https://wa.me/9080902615?text=Hello%2C%20I%20am%20interested%20in%20this%20product"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-success">
                          <i className="bi bi-basket2 me-2" />
                          Message on WhatsApp
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Nutrition */}
              {product.nutrition?.length ? (
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h2 className="h6 mb-3">Nutrition Info</h2>
                    <table className="table table-sm align-middle mb-0">
                      <tbody>
                        {product.nutrition.map(([k, v]) => (
                          <tr key={k}>
                            <th className="fw-normal">{k}</th>
                            <td className="text-end">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
