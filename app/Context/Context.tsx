"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FillType = {
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
    trades: FillType[];
    addTrades: (newTrades: FillType[]) => void;
    streamFills: (trgPubkey: string, beforeTimestamp?: number) => Promise<void>;
    downloadTradesAsJSON: () => void;

};

const TradeContext = createContext<TradeContextType | undefined>(undefined);

interface TradeProviderProps {
    children: ReactNode;
    trgPubkey: string;
}

export const TradeProvider: React.FC<TradeProviderProps> = ({ children, trgPubkey }) => {
    const [trades, setTrades] = useState<FillType[]>([]);

    const addTrades = (newTrades: FillType[]) => {
        setTrades(prev => [...prev, ...newTrades]);
    };

    const getUnixTimestamp = (dateString: string): number => {
        const date = new Date(dateString);
        return Math.floor(date.getTime() / 1000);
    };

    const streamFills = async (trgPubkey: string, beforeTimestamp?: number) => {
        const allFills: FillType[] = [];
        const products = ["SOLUSD-PERP"];

        for (const product of products) {
            const url = `https://dexterity.hxro.com/fills?product=${product}&trg=${trgPubkey}` +
                (beforeTimestamp ? `&before=${beforeTimestamp}` : "");
            const response = await fetch(url);
            const data: FillType[] = (await response.json()).fills;

            allFills.push(...data);

            if (data.length < 50) continue;
            beforeTimestamp = getUnixTimestamp(data[0].block_timestamp);
        }

        addTrades(allFills);

        if (allFills.length === 50 * products.length) {
            streamFills(trgPubkey, getUnixTimestamp(allFills[allFills.length - 1].block_timestamp));
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
        streamFills(trgPubkey);
    }, [trgPubkey]);

    return (
        <TradeContext.Provider value={{ trades, addTrades, streamFills, downloadTradesAsJSON }}>
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
