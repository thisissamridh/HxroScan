"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type FillType = {
    base_size: number;
    block_timestamp: string;
    inserted_at: string;
    maker_order_id: string;
    maker_trg: string;
    mpg: string;
    price: number;
    product: string;
    quote_size: number;
    slot: number;
    taker_side: string;
    taker_trg: string;
    tx_sig: string;
};
type TradeContextType = {
    trades: { [key: string]: FillType[] };
    addTrades: (product: string, newTrades: FillType[]) => void;
    streamFills: (product: string, trg: string, beforeTimestamp?: number) => Promise<void>;

    downloadTradesAsJSON: () => void;
    trg: string;
    setTrg: (value: string) => void;
    // clearTrades: (product: string) => void;
    clearTrades: () => void;
    selectedProduct: string;
    setSelectedProduct: React.Dispatch<React.SetStateAction<string>>;
};

const TradeContext = createContext<TradeContextType | undefined>(undefined);

interface TradeProviderProps {
    children: ReactNode;
}

type TradeState = {
    [key: string]: FillType[];
    'BTCUSD-PERP': FillType[];
    'SOLUSD-PERP': FillType[];
    'ETHUSD-PERP': FillType[];
};

export const TradeProvider: React.FC<TradeProviderProps> = ({ children }) => {
    const initialTradesState: TradeState = {
        'BTCUSD-PERP': [],
        'SOLUSD-PERP': [],
        'ETHUSD-PERP': [],
    };

    const [trades, setTrades] = useState<typeof initialTradesState>(initialTradesState);
    const [trg, setTrg] = useState('null');
    const [selectedProduct, setSelectedProduct] = useState<string>("All");

    // const clearTrades = (product: string) => {
    //     setTrades(prev => ({ ...prev, [product]: [] }));
    // };

    const clearTrades = () => {
        const clearedTrades = {
            'BTCUSD-PERP': [],
            'SOLUSD-PERP': [],
            'ETHUSD-PERP': []
        };
        setTrades(clearedTrades);
    };


    const addTrades = (product: string, newTrades: FillType[]) => {
        setTrades(prev => {
            const updatedTrades = {
                ...prev,
                [product]: [...prev[product], ...newTrades]
            };

            // Logging the number of data items for the product
            console.log(`Number of data items for ${product}:`, updatedTrades[product].length);

            return updatedTrades;
        });
    };
    const streamFills = async (product: string, trg: string, beforeTimestamp?: number) => {
        const url = `https://dexterity.hxro.com/fills?product=${product}&trg=${trg}` +
            (beforeTimestamp ? `&before=${beforeTimestamp}` : "");
        const response = await fetch(url);
        const fetchedData: FillType[] = (await response.json()).fills;

        // Filter the data to only include entries where either maker_trg or taker_trg matches the input trg
        const filteredData = fetchedData.filter(fill => fill.maker_trg === trg || fill.taker_trg === trg);

        addTrades(product, filteredData);

        // If the number of fetched (not filtered) fills reaches the maximum threshold
        if (fetchedData.length === 50) {
            const getUnixTimestamp = (dateString: string): number => {
                const date = new Date(dateString);
                return Math.floor(date.getTime() / 1000);
            };

            // Recursively call streamFills with the timestamp of the last fetched (not filtered) fill
            streamFills(product, trg, getUnixTimestamp(fetchedData[fetchedData.length - 1].block_timestamp));
        }
    };



    const downloadTradesAsJSON = () => {
        const blob = new Blob([JSON.stringify(trades)], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'trades.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    useEffect(() => {
        const fetchAllTrades = async () => {
            const products = ['BTCUSD-PERP', 'SOLUSD-PERP', 'ETHUSD-PERP'];
            const promises = products.map(product => streamFills(product, trg, undefined,));
            await Promise.all(promises);
        };

        fetchAllTrades();
    }, [trg]);


    return (
        <TradeContext.Provider value={{
            trades, addTrades, streamFills, downloadTradesAsJSON,
            trg, setTrg, clearTrades, selectedProduct, setSelectedProduct
        }}>
            {children}
        </TradeContext.Provider>
    );
};

export const useTrades = (): TradeContextType => {
    const context = useContext(TradeContext);
    if (!context) {
        throw new Error('useTrades must be used within a TradeProvider');
    }
    return context;
};