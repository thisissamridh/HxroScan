'use client'

import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush
} from 'recharts';
import { useTrades } from '../../../Context/Context';
import { Dropdown, Menu } from 'antd';
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

    const menu = (
        <Menu onClick={(e) => setSelectedProduct(e.key)}>
            <Menu.Item key="BTCUSD-PERP">BTCUSD-PERP</Menu.Item>
            <Menu.Item key="SOLUSD-PERP">SOLUSD-PERP</Menu.Item>
            <Menu.Item key="ETHUSD-PERP">ETHUSD-PERP</Menu.Item>
        </Menu>
    );

    return (
        <div className="flex flex-col mt-5 items-center justify-center min-h-screen ">
            <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-7xl">
                <div className="flex justify-between items-center rounded-lg py-2 px-4 bg-gray-200"> {/* Adjust the "200" value as needed for the desired shade of grey */}
                    <h2 className="text-xl text-center font-bold">Volume Over Time</h2>


                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link font-semibold" onClick={e => e.preventDefault()}>
                            {selectedProduct} <span style={{ marginLeft: '10px' }}>▼</span>
                        </a>
                    </Dropdown>
                </div>
                <ResponsiveContainer width="100%" className="mt-4" height={400}>
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
