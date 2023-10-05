import React from 'react';
import Navbar from './Navigation';
import SearchBar from './SearchBar';

const HeroSection: React.FC = () => {
    return (
        <div className="relative z-10 block p-2" style={{ backgroundImage: "url('/bg_banner.svg')", backgroundPosition: 'center top', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Navbar />
            <SearchBar />
        </div>
    );
};

export default HeroSection;