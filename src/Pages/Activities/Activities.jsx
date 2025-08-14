import React from 'react';
import ActivityCard from '../ActivityCard/ActivityCard';

const activities = [
    { title: 'Boating', description: 'Enjoy a relaxing day on the water.', image: 'path/to/image1.jpg' },
    { title: 'Horse Riding', description: 'Ride through beautiful trails.', image: 'path/to/image2.jpg' },
];

const Activities = () => {
    return (
        <div className="container">
            <h2 className="text-center my-4">Our Activities</h2>
            <div className="row">
                {activities.map((activity, index) => (
                    <div className="col-md-4" key={index}>
                        <ActivityCard {...activity} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activities;
