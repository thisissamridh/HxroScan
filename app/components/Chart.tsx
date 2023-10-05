'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTrades } from '../Context/Context'; // Adjust the import path to your context file

const PriceOverTimeGraph: React.FC = () => {
    const { trades } = useTrades();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-4 rounded-md w-full max-w-screen-lg shadow-lg">
                <h2 className="text-2xl mb-4 text-center font-semibold">Price Over Time</h2>
                <div className="relative h-[500px]">
                    <ResponsiveContainer>
                        <LineChart
                            data={trades}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 0,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="block_timestamp" height={70} tick={{ fontSize: 10 }} />
                            <YAxis dataKey="price" domain={['auto', 'auto']} />
                            <Tooltip />
                            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PriceOverTimeGraph;
