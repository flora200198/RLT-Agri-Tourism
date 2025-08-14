import React from 'react';

const Card = ({ title, description, image, icon, children }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
