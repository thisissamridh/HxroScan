"use client"
// import React from 'react'
// import { FiSearch } from 'react-icons/fi';
// const SearchBar = () => {
//     return (
//         <div className="text-center py-5">
//             <h1 className="text-3xl font-bold text-white">Explore HXRO Network Insights</h1>

//             <div className="mx-auto m-5 bg-white bg-opacity-30 flex justify-center items-center w-3/5  rounded-md px-2 py-2 backdrop-blur-md">
//                 <div className="dropdown dropdown-end flex-none rounded-tl-md rounded-bl-md border-r">
//                     <button className="btn btn-primary rounded-tl-md rounded-bl-md rounded-none">Select MPG</button>
//                     <ul className="menu dropdown-content bg-base-100 rounded-box ">
//                         <li><a href="#" className="whitespace-nowrap">BTCUSD-PERP</a></li>
//                         <li><a href="#" className="whitespace-nowrap">SOLUSD-PERP</a></li>
//                         <li><a href="#" className="whitespace-nowrap">ETHUSD-PERP</a></li>
//                     </ul>
//                 </div>
//                 <div className="relative flex-grow border-r">
//                     <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-none " />
//                 </div>
//                 <div className="relative flex-none ">
//                     <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl " />
//                 </div>
//             </div>







//         </div>
//     )
// }

// export default SearchBar




// import React, { useState } from 'react';
// import { FiSearch } from 'react-icons/fi';
// import { Dropdown, Menu } from 'antd';
// import { useTrades } from '../Context/Context';

// const SearchBar: React.FC = () => {
//     const { setTrg, setProduct, clearTrades } = useTrades();
//     const [selectedMPG, setSelectedMPG] = useState("Select MPG"); // For displaying the selected value

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         clearTrades();
//         setTrg(event.target.value);
//     };

//     const handleDropdownSelect = (selectedProduct: string) => {
//         clearTrades();
//         setProduct(selectedProduct);
//         setSelectedMPG(selectedProduct);
//     };

//     const menu = (
//         <Menu>
//             <Menu.Item key="1" onClick={() => handleDropdownSelect('BTCUSD-PERP')}>BTCUSD-PERP</Menu.Item>
//             <Menu.Item key="2" onClick={() => handleDropdownSelect('SOLUSD-PERP')}>SOLUSD-PERP</Menu.Item>
//             <Menu.Item key="3" onClick={() => handleDropdownSelect('ETHUSD-PERP')}>ETHUSD-PERP</Menu.Item>
//         </Menu>
//     );

//     return (
//         <div className="text-center py-5">
//             <h1 className="text-3xl font-bold text-white">Explore HXRO Network Insights</h1>
//             <div className="mx-auto m-5 bg-white bg-opacity-30 flex justify-center items-center w-3/5 rounded-md px-2 py-2 backdrop-blur-md">
//                 <Dropdown overlay={menu} className="dropdown dropdown-end flex-none rounded-tl-md rounded-bl-md border-r">
//                     <button className="btn btn-primary rounded-tl-md rounded-bl-md rounded-none">{selectedMPG}</button>
//                 </Dropdown>
//                 <div className="relative flex-grow border-r">
//                     <input
//                         type="text"
//                         placeholder="Type here"
//                         className="input input-bordered w-full rounded-none"
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className="relative flex-none ">
//                     <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl " />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SearchBar;



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
            <div className="mx-auto m-5 bg-white bg-opacity-30 flex justify-center items-center w-3/5 rounded-md px-2 py-2 backdrop-blur-md">
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
