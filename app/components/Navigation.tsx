import React from 'react';

const Navbar: React.FC = () => {
    return (

        <div className="navbar   flex rounded-box flex-wrap items-center justify-between ">
            <div className="flex items-center">

                <img src="/hxroscan.png" alt="HXROScan logo" className="h-12 w-auto" />

                <div className="bg-white/30 backdrop-sepia-0 text-white px-4 py-2 rounded">
                    $0.124
                </div>
            </div>

            <div className="flex items-center text-center text-white space-x-4 md:space-x-8">
                <a href="#" className="hidden md:block">Home</a>
                <a href="#" className="hidden md:block">TRG Analytics</a>
                <a href="#" className="hidden md:block">Ecosystem</a>

                <div className="dropdown dropdown-bottom dropdown-end ">
                    <label tabIndex={0} className="btn text-sm">Select Network</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-black text-left rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Navbar;
