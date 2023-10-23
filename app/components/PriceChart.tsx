'use client'
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';
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
                <p className="text-gray-600">{`Price: $${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }

    return null;
};

const PriceOverTimeGraph: React.FC = () => {
    const { trades } = useTrades();
    const [selectedProduct, setSelectedProduct] = useState('BTCUSD-PERP');  // Default to 'BTCUSD-PERP'
    const [dataDomain, setDataDomain] = useState(['auto', 'auto']);


    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProduct(event.target.value);
    };

    const handleBrushChange = ({ startIndex, endIndex }: any) => {
        const visibleData = trades[selectedProduct].slice(startIndex, endIndex + 1);
        setDataDomain([visibleData[0].block_timestamp, visibleData[visibleData.length - 1].block_timestamp]);
    };

    const getProductColor = (product: string) => {
        switch (product) {
            case 'BTCUSD-PERP': return '#8884d8';
            case 'SOLUSD-PERP': return '#82ca9d';
            case 'ETHUSD-PERP': return '#ffc658';
            default: return '#8884d8';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-6xl">
                <h2 className="text-xl font-bold mb-4">Price Over Time</h2>
                <select value={selectedProduct} onChange={handleDropdownChange}>
                    <option value="BTCUSD-PERP">BTCUSD-PERP</option>
                    <option value="SOLUSD-PERP">SOLUSD-PERP</option>
                    <option value="ETHUSD-PERP">ETHUSD-PERP</option>
                </select>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={trades[selectedProduct]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="block_timestamp" tickFormatter={formatDateTick} domain={dataDomain} />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={getProductColor(selectedProduct)}
                            activeDot={{ r: 8 }}
                            dot={false}
                        />
                        <Brush dataKey="block_timestamp" height={30} stroke={getProductColor(selectedProduct)} onChange={handleBrushChange} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceOverTimeGraph;

