'use client'

import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush
} from 'recharts';
import { useTrades } from '../Context/Context';

const formatDateTick = (tick: string) => {
    const date = new Date(tick);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border rounded">
                <p className="text-gray-600">{`Time: ${formatDateTick(payload[0].payload.block_timestamp)}`}</p>
                <p className="text-gray-600">{`Volume: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const VolumeOverTimeBarGraph: React.FC = () => {
    const { trades } = useTrades();
    const [selectedProduct, setSelectedProduct] = useState('BTCUSD-PERP');  // Default to 'BTCUSD-PERP'

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProduct(event.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Volume Over Time</h2>
                <select value={selectedProduct} onChange={handleDropdownChange}>
                    <option value="BTCUSD-PERP">BTCUSD-PERP</option>
                    <option value="SOLUSD-PERP">SOLUSD-PERP</option>
                    <option value="ETHUSD-PERP">ETHUSD-PERP</option>
                </select>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={trades[selectedProduct]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="block_timestamp" tickFormatter={formatDateTick} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="quote_size" fill="#82ca9d" />
                        <Brush
                            dataKey="block_timestamp"
                            height={20}
                            stroke="#82ca9d"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VolumeOverTimeBarGraph;
