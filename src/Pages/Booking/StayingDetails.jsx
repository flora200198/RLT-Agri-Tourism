import React from 'react';

// Media for stay
const stayMedia = {
  image: "https://images.unsplash.com/photo-1582719478184-90f0d0eeb3e0?auto=format&fit=crop&w=800&q=60",
  video: "https://www.w3schools.com/html/mov_bbb.mp4",
  gif: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
};

const StayDetails = () => {
  const stayDetail = {
    title: "Farm Stay Experience",
    description: "Enjoy a complete farm stay with multiple activities for the whole family. Relax, explore, and immerse yourself in nature while experiencing farm life.",
    activities: [
      { name: "Ornamental Fish Farm Tour", icon: "fas fa-fish" },
      { name: "Boating", icon: "fas fa-ship" },
      { name: "Horse Riding & Bullock Cart Ride", icon: "fas fa-horse" },
      { name: "Polyhouse & Net Cultivation Visit", icon: "fas fa-leaf" },
      { name: "Pump Set Bathing Experience", icon: "fas fa-water" },
      { name: "Coconut Picking & Fishing", icon: "fas fa-tree" },
      { name: "Lunch at the Farm", icon: "fas fa-utensils" },
      { name: "Poultry & Duck Feeding", icon: "fas fa-drumstick-bite" },
      { name: "Honey Extraction Live Demo", icon: "fas fa-bee" },
      { name: "AV Room Experience", icon: "fas fa-video" },
      { name: "Stay Overnight in the Farm", icon: "fas fa-bed" },
      { name: "Camp Fire Experience", icon: "fas fa-fire" },
      { name: "Cow Milking", icon: "fas fa-cow" },
      { name: "Light Garden Walk", icon: "fas fa-lightbulb" },
      { name: "Barbeque Dinner", icon: "fas fa-burn" }
    ],
    duration: "1 or 2 days",
    ageSuitability: "All ages",
    additionalInfo: "Wear comfortable clothes, bring a camera, and be ready for an unforgettable farm experience!"
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        {/* Media Section */}
        <div className="row g-0">
          <div className="col-md-6">
            <img src={stayMedia.image} className="img-fluid rounded-start" alt={stayDetail.title} style={{ height: "100%", objectFit: "cover" }} />
          </div>
          <div className="col-md-6 p-3">
            <h2 className="text-success mb-3">{stayDetail.title}</h2>
            <p>{stayDetail.description}</p>
            <p>
              <span className="badge bg-info me-2"><i className="fas fa-clock me-1"></i>Duration: {stayDetail.duration}</span>
              <span className="badge bg-warning text-dark"><i className="fas fa-users me-1"></i>Suitable for: {stayDetail.ageSuitability}</span>
            </p>

            <h5 className="mt-4">Included Activities:</h5>
            <ul className="list-group list-group-flush mb-3">
              {stayDetail.activities.map((act, idx) => (
                <li key={idx} className="list-group-item">
                  <i className={`${act.icon} me-2 text-primary`}></i> {act.name}
                </li>
              ))}
            </ul>

            <p><strong>Additional Info:</strong> {stayDetail.additionalInfo}</p>
          </div>
        </div>

        {/* Video/GIF Section */}
        <div className="row mt-3">
          <div className="col-md-6 mb-3">
            <h5>Watch a Video:</h5>
            <video controls className="w-100 rounded">
              <source src={stayMedia.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* <div className="col-md-6 mb-3">
            <h5>Fun GIF Preview:</h5>
            <img src={stayMedia.gif} className="img-fluid rounded" alt="stay preview gif" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StayDetails;
