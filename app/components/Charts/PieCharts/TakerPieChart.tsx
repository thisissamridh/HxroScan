
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
// import { useTrades } from '../Context/Context';
// import { Dropdown, Menu } from 'antd';
// const BidAskPieChart: React.FC = () => {
//     const { trades } = useTrades();
//     const [selectedProduct, setSelectedProduct] = useState('BTCUSD-PERP');  // Default to 'BTCUSD-PERP'

//     const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedProduct(event.target.value);
//     };


//     const [data, setData] = useState([
//         { type: 'Bid', value: 0 },
//         { type: 'Ask', value: 0 }
//     ]);

//     useEffect(() => {
//         let bid = 0;
//         let ask = 0;

//         console.log("Selected Product:", selectedProduct);
//         console.log("Trades for Selected Product:", trades[selectedProduct]);

//         if (trades[selectedProduct]) { // Check if the key exists in the trades object
//             trades[selectedProduct].forEach(trade => {
//                 if (trade.taker_side === "bid") {
//                     bid++;
//                 } else if (trade.taker_side === "ask") {
//                     ask++;
//                 }
//             });

//             console.log("Bid Count:", bid);
//             console.log("Ask Count:", ask);

//             const newData = [
//                 { type: 'Bid', value: bid },
//                 { type: 'Ask', value: ask }
//             ];
//             console.log("Pie Chart Data:", newData);

//             setData(newData);
//         }
//     }, [trades, selectedProduct]);

//     const menu = (
//         <Menu onClick={(e) => setSelectedProduct(e.key)}>
//             <Menu.Item key="BTCUSD-PERP">BTCUSD-PERP</Menu.Item>
//             <Menu.Item key="SOLUSD-PERP">SOLUSD-PERP</Menu.Item>
//             <Menu.Item key="ETHUSD-PERP">ETHUSD-PERP</Menu.Item>
//         </Menu>
//     );


//     const COLORS = ['#8884d8', '#82ca9d'];
//     return (
//         <div className="flex flex-col mt-5 items-center justify-center min-h-screen">
//             <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-7xl">
//                 <div className="flex justify-between items-center rounded-t-lg py-2 px-4 bg-gray-200">
//                     <h2 className="text-xl text-center font-bold">Bid/Ask Distribution for {selectedProduct}</h2>
//                     <Dropdown overlay={menu} trigger={['click']}>
//                         <a className="ant-dropdown-link font-semibold" onClick={e => e.preventDefault()}>
//                             {selectedProduct} <span style={{ marginLeft: '10px' }}>▼</span>
//                         </a>
//                     </Dropdown>
//                 </div>
//                 <PieChart width={400} height={400} className="mt-4">
//                     <Pie
//                         data={data}
//                         dataKey="value"
//                         nameKey="type"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={150}
//                         fill="#8884d8"
//                     >
//                         {data.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                 </PieChart>
//             </div>
//         </div>
//     );
// };

// export default BidAskPieChart;


'use client'
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { useTrades } from '../../../Context/Context';

import { Dropdown, Menu } from 'antd';

const BidAskPieChart: React.FC = () => {
    const { trades } = useTrades();
    const [selectedProduct, setSelectedProduct] = useState('BTCUSD-PERP');  // Default to 'BTCUSD-PERP'

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProduct(event.target.value);
    };

    const [data, setData] = useState([
        { type: 'Bid', value: 0 },
        { type: 'Ask', value: 0 }
    ]);

    useEffect(() => {
        setData(generatePieChartData(selectedProduct));
    }, [trades, selectedProduct]);

    const generatePieChartData = (product: string) => {
        let bid = 0;
        let ask = 0;
        if (trades[product]) {
            trades[product].forEach(trade => {
                if (trade.taker_side === "bid") {
                    bid++;
                } else if (trade.taker_side === "ask") {
                    ask++;
                }
            });
        }
        return [
            { type: 'Bid', value: bid },
            { type: 'Ask', value: ask }
        ];
    };

    const menu = (
        <Menu onClick={(e) => setSelectedProduct(e.key)}>
            <Menu.Item key="BTCUSD-PERP">BTCUSD-PERP</Menu.Item>
            <Menu.Item key="SOLUSD-PERP">SOLUSD-PERP</Menu.Item>
            <Menu.Item key="ETHUSD-PERP">ETHUSD-PERP</Menu.Item>
        </Menu>
    );

    const COLORS = ['#8884d8', '#82ca9d'];

    return (
        <div className="flex flex-col mt-5 items-center justify-center min-h-screen">
            <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-7xl">
                <div className="flex justify-between items-center rounded-lg py-2 px-4 bg-gray-200">
                    <h2 className="text-xl text-center font-bold md:hidden">Bid/Ask Distribution for {selectedProduct}</h2>
                    <h2 className="text-xl text-center font-bold hidden md:block">Bid/Ask Distribution</h2>
                    <div className="md:hidden">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link font-semibold" onClick={e => e.preventDefault()}>
                                {selectedProduct} <span className="ml-2.5">▼</span>
                            </a>
                        </Dropdown>
                    </div>
                </div>

                <div className="md:hidden">
                    <PieChart width={300} height={300} className="mt-4">
                        <Pie data={data} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                {/* Pie Charts for all products on desktop */}
                <div className="flex justify-between items-center hidden md:flex mt-4">
                    {["BTCUSD-PERP", "SOLUSD-PERP", "ETHUSD-PERP"].map(product => (
                        <div key={product} className="w-1/3 px-2">
                            <h2 className="text-lg text-center font-bold mb-4">{product}</h2>
                            <PieChart width={300} height={300}>
                                <Pie data={generatePieChartData(product)} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={125} fill="#8884d8">
                                    {generatePieChartData(product).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BidAskPieChart;