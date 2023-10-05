import React from 'react'
import { FiSearch } from 'react-icons/fi';
const SearchBar = () => {
    return (
        <div className="text-center py-5">
            <h1 className="text-3xl font-bold text-white">Explore HXRO Network Insights</h1>

            <div className="mx-auto m-5 bg-white bg-opacity-30 flex justify-center items-center w-3/5  rounded-md px-2 py-2 backdrop-blur-md">
                <div className="dropdown dropdown-end flex-none rounded-tl-md rounded-bl-md border-r">
                    <button className="btn btn-primary rounded-tl-md rounded-bl-md rounded-none">Select MPG</button>
                    <ul className="menu dropdown-content bg-base-100 rounded-box ">
                        <li><a href="#" className="whitespace-nowrap">BTCUSD-PERP</a></li>
                        <li><a href="#" className="whitespace-nowrap">SOLUSD-PERP</a></li>
                        <li><a href="#" className="whitespace-nowrap">ETHUSD-PERP</a></li>
                    </ul>
                </div>
                <div className="relative flex-grow border-r">
                    <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-none " />
                </div>
                <div className="relative flex-none ">
                    <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl " />
                </div>
            </div>







        </div>
    )
}

export default SearchBar


