import React from 'react';

// Sample media for each activity
const activityMedia = {
  farm: {
    image: "/assets/OnedayFarmVisit.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    // gif: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
  },
  bday: {
    image: "/assets/bday.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    // gif: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
  },
  swimming: {
    image: "/assets/Pool.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    // gif: "https://media.giphy.com/media/l3vR1vLZxBo7GmGv6/giphy.gif"
  },
  avroom: {
    image: "/assets/AV.png",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    // gif: "https://media.giphy.com/media/3o7TKPscxvU2Zd2tGM/giphy.gif"
  }
};

const ActivityDetails = ({ activity }) => {
  const details = {
    farm: {
      title: "One Day Farm Visit",
      description: "Experience a full day at our ornamental fish farm and agro-farm. Enjoy hands-on activities like feeding poultry and ducks, honey extraction, and exploring the flower garden.",
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
        { name: "AV Room Experience", icon: "fas fa-video" }
      ],
      duration: "6-8 hours",
      ageSuitability: "All ages",
      additionalInfo: "Wear comfortable shoes, carry water, and enjoy the farm vibes!"
    },
    bday: {
      title: "Birthday Party (4 hrs)",
      description: "Celebrate birthdays with fun activities, decorations, and delicious food.",
      activities: [
        { name: "Food & Cake", icon: "fas fa-birthday-cake" },
        { name: "Swimming Pool Fun", icon: "fas fa-swimmer" },
        { name: "Boating Activity", icon: "fas fa-ship" },
        { name: "Party Decorations (extra charges may apply)", icon: "fas fa-gift" }
      ],
      duration: "4 hours",
      ageSuitability: "Kids and Adults",
      additionalInfo: "Custom decorations and cake available on request."
    },
    swimming: {
      title: "Swimming Pool with Food (2 hrs)",
      description: "Relax and have fun with swimming and refreshments included.",
      activities: [
        { name: "Swimming", icon: "fas fa-swimmer" },
        { name: "Snacks & Beverages", icon: "fas fa-coffee" }
      ],
      duration: "2 hours",
      ageSuitability: "Above 5 years",
      additionalInfo: "Lifeguard on duty. Swimwear required."
    },
    avroom: {
      title: "AV Room with Food (4 hrs)",
      description: "Interactive AV room experience with food, perfect for small gatherings or educational visits.",
      activities: [
        { name: "AV Room Experience", icon: "fas fa-video" },
        { name: "Food", icon: "fas fa-utensils" },
        { name: "Optional Decoration (additional charges)", icon: "fas fa-gift" }
      ],
      duration: "4 hours",
      ageSuitability: "All ages",
      additionalInfo: "Projector and interactive boards available."
    }
  };

  if (!activity) return null;
  const activityDetail = details[activity];
  const media = activityMedia[activity];

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        {/* Media Section */}
        <div className="row g-0">
          <div className="col-md-6">
            <img src={media.image} className="img-fluid rounded-start" alt={activityDetail.title} style={{ height: "100%", objectFit: "cover" }} />
          </div>
          <div className="col-md-6 p-3">
            <h2 className="text-primary mb-3">{activityDetail.title}</h2>
            <p>{activityDetail.description}</p>
            <p>
              <span className="badge bg-success me-2"><i className="fas fa-clock me-1"></i>Duration: {activityDetail.duration}</span>
              <span className="badge bg-warning text-dark"><i className="fas fa-users me-1"></i>Suitable for: {activityDetail.ageSuitability}</span>
            </p>

            <h5 className="mt-4">Included Activities:</h5>
            <ul className="list-group list-group-flush mb-3">
              {activityDetail.activities.map((act, idx) => (
                <li key={idx} className="list-group-item">
                  <i className={`${act.icon} me-2 text-info`}></i> {act.name}
                </li>
              ))}
            </ul>

            <p><strong>Additional Info:</strong> {activityDetail.additionalInfo}</p>
          </div>
        </div>

        {/* Video/GIF Section */}
        {/* <div className="row mt-3">
          <div className="col-md-6 mb-3"> */}
            {/* <h5>Watch a Video:</h5> */}
            {/* <video controls className="w-100 rounded">
              <source src={media.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
          </div>
          {/* <div className="col-md-6 mb-3">
            <h5>Fun GIF Preview:</h5>
            <img src={media.gif} className="img-fluid rounded" alt="activity preview gif" />
          </div> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default ActivityDetails;
