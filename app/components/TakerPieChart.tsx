
'use client'
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { useTrades } from '../Context/Context';

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
        let bid = 0;
        let ask = 0;

        console.log("Selected Product:", selectedProduct);
        console.log("Trades for Selected Product:", trades[selectedProduct]);

        if (trades[selectedProduct]) { // Check if the key exists in the trades object
            trades[selectedProduct].forEach(trade => {
                if (trade.taker_side === "bid") {
                    bid++;
                } else if (trade.taker_side === "ask") {
                    ask++;
                }
            });

            console.log("Bid Count:", bid);
            console.log("Ask Count:", ask);

            const newData = [
                { type: 'Bid', value: bid },
                { type: 'Ask', value: ask }
            ];
            console.log("Pie Chart Data:", newData);

            setData(newData);
        }
    }, [trades, selectedProduct]);



    const COLORS = ['#8884d8', '#82ca9d'];
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Bid/Ask Distribution for {selectedProduct}</h2>
                <select value={selectedProduct} onChange={handleDropdownChange}>
                    <option value="BTCUSD-PERP">BTCUSD-PERP</option>
                    <option value="SOLUSD-PERP">SOLUSD-PERP</option>
                    <option value="ETHUSD-PERP">ETHUSD-PERP</option>
                </select>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default BidAskPieChart;


