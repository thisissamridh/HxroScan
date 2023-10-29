import React from 'react';
import Navbar from './Navigation';
import SearchBar from '../Utils/SearchBar';

const HeroSection: React.FC = () => {
    return (
        <div className="relative z-10 block p-2 bg-gradient-to-r from-pink-500 from-5% via-gradient-purple via-30% via-gradient-blue via-40% to-gradient-green to-90%">
            <Navbar />
            <SearchBar />
        </div>
    );
};

export default HeroSection;
