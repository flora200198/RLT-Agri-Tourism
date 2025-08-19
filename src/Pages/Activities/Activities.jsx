import React from "react";

const activities = [
  {
    title: "Horse Riding",
    description: "Ride through scenic farm trails with our friendly horses.",
    image: "/assets/HorseRiding.png",
  },
  {
    title: "Coconut Picking",
    description: "Learn traditional ways of climbing and harvesting coconuts.",
    image: "/assets/CoconutPicking.png",
  },
  {
    title: "Cow Milking",
    description: "Experience the joy of hand-milking cows in the shed.",
    image: "/assets/CowMilking.png",
  },
  {
    title: "Fishing",
    description: "Relax by our pond and try your hand at fishing.",
    image: "/assets/Fishing.png",
  },
  {
    title: "Aquarium Visit",
    description: "Explore colorful aquatic life in our farm aquarium.",
    image: "/assets/Aquarium.png",
  },
  {
    title: "Cow Feeding",
    description: "Feed the cows and calves with fresh fodder.",
    image: "/assets/CowFeeding.png",
  },
  {
    title: "Fruit Picking",
    description: "Hand-pick seasonal fruits straight from the orchards.",
    image: "/assets/FruitPicking.png",
  },
  {
    title: "Nursery Visit",
    description: "Discover a variety of plants and learn gardening tips.",
    image: "/assets/NurseryVisit.png",
  },
  {
    title: "Kids Park",
    description: "A safe play area with swings, slides, and open space.",
    image: "/assets/KidsPark.png",
  },
  {
    title: "Bird Watching",
    description: "Spot parrots, peacocks, and migratory birds.",
    image: "/assets/BirdsWatching.png",
  },
  {
    title: "Duck Feeding",
    description: "Feed ducks by the pond and watch them waddle happily.",
    image: '/assets/DuckFeeding.png',
  },
  {
    title: "Bullock Cart Ride",
    description: "Take a nostalgic ride on a traditional bullock cart.",
    image: "/assets/BullRide.png",
  },
  {
    title: "AV Room Experience",
    description: "Learn farming techniques with our interactive AV sessions.",
    image: "/assets/AVRoom.png",
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
