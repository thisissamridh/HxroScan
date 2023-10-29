"use client"




import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { useTrades } from '../Context/Context';

const SearchBar: React.FC = () => {
    const { setTrg, clearTrades } = useTrades();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTrades();  // Clearing the existing trades data
        setTrg(event.target.value);  // Setting the trg value based on the input
    };

    return (
        <div className="text-center py-5">
            <h1 className="text-3xl font-bold text-white">Explore HXRO Network Insights</h1>
            <div className="mx-auto m-5 bg-white bg-opacity-30 flex justify-center items-center w-2/4 rounded-md px-2 py-2 backdrop-blur-md">
                <div className="relative flex-grow border-r">
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full rounded-none"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative flex-none ">
                    <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl " />
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
