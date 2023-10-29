'use client'
import React, { useState } from 'react';
import { ComposedChart, Brush, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

    const menu = (
        <Menu onClick={(e) => setSelectedProduct(e.key)}>
            <Menu.Item key="BTCUSD-PERP">BTCUSD-PERP</Menu.Item>
            <Menu.Item key="SOLUSD-PERP">SOLUSD-PERP</Menu.Item>
            <Menu.Item key="ETHUSD-PERP">ETHUSD-PERP</Menu.Item>
        </Menu>
    );

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

    const renderLegend = (props: any) => {
        return (
            <ul>
                <li className="legend-item text-center font-bold">
                    Base Size
                </li>
            </ul>
        );
    };
    return (
        <div className="flex flex-col mt-5 items-center justify-center min-h-screen ">
            <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-7xl" >
                <div className="flex justify-between items-center rounded-lg py-2 px-4 bg-gray-200"> {/* Adjust the "200" value as needed for the desired shade of grey */}
                    <h2 className="text-xl text-center font-bold">Price Over Time</h2>


                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link font-semibold" onClick={e => e.preventDefault()}>
                            {selectedProduct} <span style={{ marginLeft: '10px' }}>▼</span>
                        </a>
                    </Dropdown>
                </div>

                <ResponsiveContainer width="100%" className="mt-4" height={400}>
                    <ComposedChart data={trades[selectedProduct]}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="block_timestamp" tickFormatter={formatDateTick} domain={dataDomain} />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderLegend} />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={getProductColor(selectedProduct)}

                            activeDot={{ r: 8 }}
                            dot={false}
                        />
                        <Area dataKey="price" fill="#ADFF2F	" />
                        {/* <Bar dataKey="price" fill="#413ea0" /> */}
                        <Brush dataKey="block_timestamp" height={30} stroke={getProductColor(selectedProduct)} onChange={handleBrushChange} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceOverTimeGraph;

