// AboutFarm.jsx
import React from "react";

const AboutFarm = () => {
  // Replace these image URLs with your actual assets
  const IMAGES = {
    hero:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1280&auto=format&fit=crop", // trees/farm
    story:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop", // soil/hand
    animals:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    fishpond:
      "https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?q=80&w=1200&auto=format&fit=crop",
    school:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop",
  };

  const stats = [
    { value: "10,000+", label: "Happy Visitors & Customers", icon: "bi-people" },
    { value: "600+", label: "Acres of Farmland", icon: "bi-map" },
    { value: "400+", label: "Skilled People", icon: "bi-person-workspace" },
    { value: "10+", label: "Years of Service", icon: "bi-award" },
  ];

  const values = [
    {
      icon: "bi-recycle",
      title: "Sustainability First",
      text:
        "Closed-loop soil management, organic inputs, and smart resource use to reduce waste.",
    },
    {
      icon: "bi-briefcase",
      title: "Farmer Empowerment",
      text:
        "Training and tools that enable rural entrepreneurship and long-term prosperity.",
    },
    {
      icon: "bi-mortarboard",
      title: "Community Learning",
      text:
        "School tours and family experiences that reconnect people with farming.",
    },
    {
      icon: "bi-heart-pulse",
      title: "Health & Purity",
      text:
        "Naturally grown, chemical-free produce for a better plate and planet.",
    },
  ];

  const explore = [
    {
      title: "Farm Visits",
      text:
        "Walk among 10,000+ trees, meet animals, and see how crops are grown the natural way.",
      img: IMAGES.animals,
      icon: "bi-tree",
    },
    {
      title: "School Tours",
      text:
        "Curriculum-friendly tours that teach children about biodiversity and food origins.",
      img: IMAGES.school,
      icon: "bi-backpack",
    },
    {
      title: "Nature Exploration",
      text:
        "From poultry sheds to thriving fish ponds—discover sustainable living in action.",
      img: IMAGES.fishpond,
      icon: "bi-binoculars",
    },
  ];

  const leadership = [
    { name: "Dr. G.P Thirumurugan", role: "Co-Founder & CEO", icon: "bi-person-fill" },
    // { name: "Toni Pinto", role: "Chief Financial Officer", icon: "bi-cash-coin" },
    // { name: "Rajeev K", role: "Head of Farm Programs", icon: "bi-diagram-3" },
    // { name: "Nethra", role: "Administrative Controller", icon: "bi-clipboard2-check" },
  ];

  const products = [
    "Milk",
    "Pure Ghee",
    "Coconuts",
    "Fruits",
    "Chicken",
    "Duck",
    "Fresh Fish",
  ];

  return (
    <main className="AboutFarm">
      {/* Hero */}
      <section
        className="position-relative text-white"
        style={{
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="py-5"
          style={{ backdropFilter: "brightness(0.6)" }}
          aria-hidden="true"
        />
        <div className="container position-absolute top-50 start-50 translate-middle">
          <div className="text-center">
            <span className="badge bg-success-subtle text-success mb-3">
              🌿 About Us
            </span>
            <h1 className="display-5 fw-bold">
              Benchmark Quality from the Crop to Cup
            </h1>
            <p className="lead mt-3">
              We nurture nature. Every step we take considers the environment,
              biodiversity, and self-sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <p className="mb-3">
                With over <strong>10,000+ trees</strong>, farm animals, and fish
                ponds, our farm is a living classroom where people explore, learn,
                and reconnect with the roots of agriculture.
              </p>
              <p className="mb-0">
                We follow eco-friendly practices like{" "}
                <strong>closed-loop soil management</strong>, natural manure
                recycling, and organic cultivation—giving back to the land while
                producing <strong>pure, chemical-free</strong> food.
              </p>
            </div>
            <div className="col-lg-5">
              <img
                src={IMAGES.story}
                className="img-fluid rounded-4 shadow-sm"
                alt="Hands holding living soil"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 mb-3">🌱 The Team Behind the Farm</h2>
          <p className="mb-0">
            What began as a vision to encourage youth in agriculture has grown
            into a community movement—empowering farmers, enabling rural
            entrepreneurship, and spreading awareness of natural farming.
            Students, families, and visitors are welcome to discover how farms
            thrive sustainably and how agriculture can be a vocation of choice.
          </p>
        </div>
      </section>

      {/* Explore & Experience */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="h3 m-0">👨‍👩‍👧‍👦 Explore & Experience</h2>
          </div>
          <div className="row g-4">
            {explore.map((item, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: 220 }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className={`bi ${item.icon} me-2`} />
                      {item.title}
                    </h5>
                    <p className="card-text">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="mt-5">
            <h3 className="h5 mb-3">
              <i className="bi bi-basket2 me-2" />
              Buy Fresh at the Farm
            </h3>
            <p className="mb-2">
              Visitors can purchase farm-fresh products directly from the source:
            </p>
            <ul className="list-inline">
              {products.map((p) => (
                <li key={p} className="list-inline-item badge bg-success-subtle text-success fw-semibold me-2 mb-2">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 mb-4">🌍 Our Values</h2>
          <div className="row g-4">
            {values.map((v) => (
              <div className="col-md-6 col-lg-3" key={v.title}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <i className={`bi ${v.icon} fs-3 text-success me-2`} />
                      <h5 className="card-title mb-0">{v.title}</h5>
                    </div>
                    <p className="card-text">{v.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-5">
        <div className="container">
          <h2 className="visually-hidden">Our Journey in Numbers</h2>
          <div className="row g-4 text-center">
            {stats.map((s) => (
              <div className="col-6 col-md-3" key={s.label}>
                <div className="p-4 rounded-4 border bg-white h-100 shadow-sm">
                  <i className={`bi ${s.icon} fs-2 text-success d-block mb-2`} />
                  <div className="h4 fw-bold mb-1">{s.value}</div>
                  <div className="text-secondary small">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Circular economy */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 mb-3">🌿 Our Story</h2>
          <p className="mb-3">
            When the soil is alive, nature thrives. We grow nutrient-rich fodder,
            care for animals ethically, and return organic matter to the land via
            bio-digesters—powering equipment with methane and enriching fields
            with natural slurry. Nothing goes to waste.
          </p>
          <p className="mb-0">
            This circular approach sustains life, supports farmers, and ensures
            safe, fresh food—all with transparency and accountability.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-5">
        <div className="container">
          <h2 className="h3 mb-4">👥 Leadership</h2>
          <div className="row g-4">
            {leadership.map((m) => (
              <div className="col-sm-6 col-lg-3" key={m.name}>
                <div className="card h-100 border-0 shadow-sm text-center">
                  <div className="card-body">
                    <i className={`bi ${m.icon} fs-1 text-success d-block mb-2`} />
                    <h5 className="card-title mb-1">{m.name}</h5>
                    <p className="text-secondary mb-0">{m.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-success text-white">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <h2 className="h3 mb-2">🌎 Invest in a Greener Future</h2>
              <p className="mb-0">
                Visit the farm to support sustainability, farmer livelihoods, and
                hands-on learning for the next generation. Explore, learn, and grow
                with us.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a href="/book-visit" className="btn btn-light fw-semibold">
                <i className="bi bi-calendar2-week me-2" />
                Book a Farm Visit
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutFarm;
