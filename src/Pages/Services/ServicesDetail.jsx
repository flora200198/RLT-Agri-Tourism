import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import ServicesMenu from "./ServicesData";

const ServicePage = () => {
  const { slug } = useParams();

  // Find the service by slug (from link)
  const service = useMemo(() => {
    return ServicesMenu.options.find((s) => {
      const serviceSlug = s.link.split("/").pop(); 
      return serviceSlug === slug;
    });
  }, [slug]);

  if (!service) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <h1 className="h4 mb-3">Service not found</h1>
          <Link to="/services" className="btn btn-success">
            View All Services
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section
        className="position-relative text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "70vh",
        }}
      >
        <div
          className="w-100 h-100 position-absolute top-0 start-0"
          style={{ backdropFilter: "brightness(0.5)" }}
        />
        <div className="container text-center position-relative z-1">
          <h1 className="display-4 fw-bold">{service.label}</h1>
          <p className="lead">{service.tagline}</p>
          <a href="#details" className="btn btn-lg btn-success shadow mt-3">
            Learn More
          </a>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-5" id="details">
        <div className="container">
          <h2 className="h3 text-center mb-5">Why Choose Our Service</h2>
          <div className="row g-4">
            {service.highlights?.map((h, i) => (
              <div key={i} className="col-md-4">
                <div className="card border-0 shadow-sm h-100 text-center p-4">
                  <i className={`bi ${h.icon} text-success fs-1 mb-3`} />
                  <h5>{h.title}</h5>
                  <p className="text-muted">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      {service.process && (
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="h3 text-center mb-5">How It Works</h2>
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <ul className="list-group ">
                  {service.process.map((step, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex flex-column align-items-start"
                    >
                      <h6 className="fw-bold">{step.title}</h6>
                      <p className="mb-0 text-muted">{step.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6 text-center">
                {service.video ? (
                  <div className="ratio ratio-16x9 rounded shadow overflow-hidden">
                    <iframe
                      src={service.video}
                      title="Service Video"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    src={service.image}
                    alt="Process"
                    className="img-fluid rounded shadow"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {service.testimonials?.length ? (
        <section className="py-5">
          <div className="container">
            <h2 className="h3 text-center mb-5">What Our Clients Say</h2>
            <div className="row g-4">
              {service.testimonials.map((t, i) => (
                <div key={i} className="col-md-4">
                  <div className="card border-0 shadow-sm h-100 p-4">
                    <p className="fst-italic">“{t.feedback}”</p>
                    <div className="d-flex align-items-center mt-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6 className="mb-0">{t.name}</h6>
                        <small className="text-muted">{t.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <h2 className="h3 fw-bold mb-3">
            Ready to Get Started with {service.label}?
          </h2>
          <p className="mb-4">{service.ctaText}</p>
          <a
            href={`https://wa.me/9080902615?text=I%20am%20interested%20in%20the%20${service.label}%20service`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-light text-success fw-semibold"
          >
            <i className="bi bi-whatsapp me-2" />
            Contact Us on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
};

export default ServicePage;
