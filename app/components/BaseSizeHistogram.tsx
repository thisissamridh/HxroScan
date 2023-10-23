'use client'
import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useTrades } from '../Context/Context';
import { FillType } from '../Context/Context'; // Adjust the path as needed


const BaseSizeHistogram: React.FC = () => {
    const { trades } = useTrades();
    const [selectedProduct, setSelectedProduct] = useState("BTCUSD-PERP");

    // const { trades, setSelectedProduct, selectedProduct } = useTrades();
    const [binnedData, setBinnedData] = useState<BinnedTradeData[]>([]);


    type BinnedTradeData = {
        bin: string;
        count: number;
    };

    const binData = (trades: FillType[] = []): BinnedTradeData[] => {
        // Determine the min and max base_size from the trades
        const minSize = Math.min(...trades.map(trade => trade.base_size));
        const maxSize = Math.max(...trades.map(trade => trade.base_size));

        // Compute the number of bins based on logarithmic scale
        const bins: number[] = [];
        let currentBin = minSize;

        // This will create bins like: 0.0009, 0.001, 0.01, 0.1, 1, 10, 100,...
        while (currentBin <= maxSize) {
            bins.push(currentBin);
            if (currentBin < 0.001) {
                currentBin += 0.0001;
            } else {
                currentBin *= 10;
            }
        }
        bins.push(currentBin); // add one more to cover up to the maximum value

        // Initialize counts for all bins
        const binCounts = new Array(bins.length - 1).fill(0);

        trades.forEach(trade => {
            const binIndex = findBin(trade.base_size, bins);
            binCounts[binIndex]++;
        });

        // Convert counts to the format expected by the BarChart component
        const binnedData: BinnedTradeData[] = binCounts.map((count, index) => {
            return {
                bin: `${bins[index].toFixed(4)} - ${bins[index + 1].toFixed(4)}`,
                count: count
            };
        });


        return binnedData;
    }

    // This function finds the appropriate bin for a given value
    const findBin = (value: number, bins: number[]): number => {
        for (let i = 0; i < bins.length - 1; i++) {
            if (value >= bins[i] && value < bins[i + 1]) {
                return i;
            }
        }
        return bins.length - 2; // this handles the edge case where value is exactly equal to the max bin value
    }


    useEffect(() => {
        // Assuming you have a function to bin your data based on 'base_size'
        if (trades[selectedProduct]) {
            const data = binData(trades[selectedProduct]);
            setBinnedData(data);
        }

    }, [trades, selectedProduct]);

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProduct(event.target.value);
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip  rounded-md text-center font-semibold" style={{ border: '1px solid #ccc', backgroundColor: 'white', padding: '10px' }}>
                    <p className="label">{`Bin: ${label}`}</p>
                    <p className="count">{`Base Size: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-6xl" >
                <h2 className="text-xl text-center font-bold mb-4">Base Size Distribution Histogram</h2>
                <select value={selectedProduct} onChange={handleDropdownChange}>
                    <option value="BTCUSD-PERP">BTCUSD-PERP</option>
                    <option value="SOLUSD-PERP">SOLUSD-PERP</option>
                    <option value="ETHUSD-PERP">ETHUSD-PERP</option>
                </select>
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={binnedData}>
                        <XAxis dataKey="bin" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderLegend} />
                        <CartesianGrid stroke="#f5f5f5" />
                        {/* Adjust dataKey props to match your data structure */}
                        <Area type="monotone" dataKey="count" fill="#ADFF2F	" stroke="#8884d8" />
                        <Bar dataKey="count" barSize={20} fill="#413ea0" />
                        <Line type="monotone" dataKey="count" stroke="#ff7300" />
                    </ComposedChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default BaseSizeHistogram;
