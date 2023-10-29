
"use client"
import { useState, useEffect } from 'react';
import { fetchPriceAndIcon } from '../../Api/FetchPrice'
const Navbar: React.FC = () => {

    const [price, setPrice] = useState(null);
    const [icon, setIcon] = useState(null);

    // Fetch price and icon when component mounts
    useEffect(() => {
        async function fetchData() {
            const data = await fetchPriceAndIcon();
            if (data) {
                setPrice(data.price.toFixed(2));  // Round price to 2 decimal places
                setIcon(data.icon);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Navbar */}
                <div className="navbar flex rounded-box flex-wrap items-center justify-between">
                    <div className="flex items-center">
                        <img src="/hxroscan_no_bg.png" alt="HXROScan logo" className="h-12 w-auto" />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }} className="bg-white/30 hidden md:inline-block backdrop-sepia-0 text-white px-2 py-2 mx-2 rounded">
                            {icon && <img src="/hxrologo.png" alt="Icon" className="h-6 w-auto mr-2 " />}  {/* Icon on the first line */}
                            {price ? `$${price}` : 'Loading...'}  {/* Price on the second line */}
                        </div>

                    </div>

                    <div className="flex items-center text-center text-white space-x-4 lg:space-x-8">
                        <a href="#" className="hidden md:block">Home</a>
                        <a href="#" className="hidden md:block">TRG Analytics</a>
                        <a href="#" className="hidden md:block">Ecosystem</a>

                        <div className="dropdown dropdown-bottom dropdown-end hidden md:block">
                            <label tabIndex={0} className="btn text-sm">Select Network</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-black text-left rounded-box w-52">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>

                        {/* Hamburger menu for mobile */}
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                </div>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-100 text-black">
                    {/* Sidebar content here for mobile */}
                    <li><a>Home</a></li>
                    <li><a>TRG Analytics</a></li>
                    <li><a>Ecosystem</a></li>
                    <li>
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <label tabIndex={0} className="btn text-sm">Select Network</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-black text-left rounded-box w-52">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
