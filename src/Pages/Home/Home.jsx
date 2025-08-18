import React from 'react';
import HeroSection from '../../components/Sections/HeroSection';

const Home = () => {
    return (
        <div className="container">
            <h1 className="text-center my-4">Welcome to My Farm</h1>
            <p className="text-center">Experience the joy of nature and fun activities!</p>
            <HeroSection />
        </div>
    );
};

export default Home;
