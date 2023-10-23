'use client'
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { useTrades } from '../Context/Context';

const TradeDistributionPieChart: React.FC = () => {

    type ProductData = {
        name: string;
        value: number;
    };


    const { trades } = useTrades();

    const [data, setData] = useState<ProductData[]>([]);

    useEffect(() => {
        const productKeys = ['BTCUSD-PERP', 'SOLUSD-PERP', 'ETHUSD-PERP'];
        const aggregatedData = productKeys.map(product => {
            return {
                name: product,
                value: trades[product] ? trades[product].length : 0
                // If you want to aggregate by volume, you can replace `.length` with a reduce function to sum the `quote_size`
            };
        });

        setData(aggregatedData);
    }, [trades]);

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Trade Distribution by Product</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
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

export default TradeDistributionPieChart;
