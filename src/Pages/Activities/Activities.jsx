import React from "react";

const activities = [
  {
    title: "Horse Riding",
    description: "Ride through scenic farm trails with our friendly horses.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Coconut Picking",
    description: "Learn traditional ways of climbing and harvesting coconuts.",
    image: "https://images.unsplash.com/photo-1602312045642-2a2b35c7c54a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Cow Milking",
    description: "Experience the joy of hand-milking cows in the shed.",
    image: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Fishing",
    description: "Relax by our pond and try your hand at fishing.",
    image: "https://images.unsplash.com/photo-1508182311256-e3f7d7e0f1b5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Aquarium Visit",
    description: "Explore colorful aquatic life in our farm aquarium.",
    image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Cow Feeding",
    description: "Feed the cows and calves with fresh fodder.",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Fruit Picking",
    description: "Hand-pick seasonal fruits straight from the orchards.",
    image: "https://images.unsplash.com/photo-1534949848578-94a57c0d66e5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Nursery Visit",
    description: "Discover a variety of plants and learn gardening tips.",
    image: "https://images.unsplash.com/photo-1617196034796-73fa7d89f67a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Kids Park",
    description: "A safe play area with swings, slides, and open space.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Bird Watching",
    description: "Spot parrots, peacocks, and migratory birds.",
    image: "https://images.unsplash.com/photo-1501706362039-c6e80948c8d1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Duck Feeding",
    description: "Feed ducks by the pond and watch them waddle happily.",
    image: "https://images.unsplash.com/photo-1614607241711-f9a85cae1d77?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Bullock Cart Ride",
    description: "Take a nostalgic ride on a traditional bullock cart.",
    image: "https://images.unsplash.com/photo-1580719461428-35ef09c16a64?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "AV Room Experience",
    description: "Learn farming techniques with our interactive AV sessions.",
    image: "https://images.unsplash.com/photo-1581092919535-7146c41a02c1?q=80&w=1600&auto=format&fit=crop",
  },
];

const Activities = () => {
  return (
    <section className="activities-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">Adventure Activities</h2>

        <div className="row g-4">
          {activities.map((activity, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div
                className="activity-item position-relative overflow-hidden rounded-3 shadow-sm"
                style={{
                  background: `url(${activity.image}) center/cover no-repeat`,
                  height: "260px",
                }}
              >
                {/* Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center text-center text-white p-3">
                  <h4 className="fw-semibold">{activity.title}</h4>
                  <p className="mb-0 small">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
