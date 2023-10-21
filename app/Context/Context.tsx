"use client";




// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// type FillType = {
//     base_size: number;
//     block_timestamp: string;
//     inserted_at: string;
//     maker_order_id: string;
//     maker_trg: string;
//     mpg: string;
//     price: number;
//     product: string;
//     quote_size: number;
//     slot: number;
//     taker_side: string;
//     taker_trg: string;
//     tx_sig: string;
// };

// type TradeContextType = {
//     trades: FillType[];
//     addTrades: (newTrades: FillType[]) => void;
//     streamFills: (beforeTimestamp?: number) => Promise<void>;
//     downloadTradesAsJSON: () => void;
//     trg: string;
//     product: string;
//     setTrg: (value: string) => void;
//     setProduct: (value: string) => void;
//     clearTrades: () => void;
// };



// const TradeContext = createContext<TradeContextType | undefined>(undefined);

// interface TradeProviderProps {
//     children: ReactNode;
// }

// export const TradeProvider: React.FC<TradeProviderProps> = ({ children }) => {
//     const [trades, setTrades] = useState<FillType[]>([]);
//     const [trg, setTrg] = useState('HyRypoH2B8UPCVvcFqEBFh1E8f7HoHta9tWBJkMa3r7L');
//     const [product, setProduct] = useState("SOLUSD-PERP");

//     const clearTrades = () => {
//         setTrades([]); // This will reset the trades
//     };

//     const addTrades = (newTrades: FillType[]) => {
//         setTrades(prev => [...prev, ...newTrades]);
//     };

//     const streamFills = async (beforeTimestamp?: number) => {
//         const allFills: FillType[] = [];

//         const url = `https://dexterity.hxro.com/fills?product=${product}&trg=${trg}` +
//             (beforeTimestamp ? `&before=${beforeTimestamp}` : "");

//         const response = await fetch(url);
//         const data: FillType[] = (await response.json()).fills;

//         allFills.push(...data);

//         addTrades(allFills);



//         // Recursively fetch more fills if the number of retrieved fills reaches the maximum threshold
//         if (allFills.length === 50) { // No need to multiply by products.length since we're using a single product now
//             const getUnixTimestamp = (dateString: string): number => {
//                 const date = new Date(dateString);
//                 return Math.floor(date.getTime() / 1000);
//             };

//             streamFills(getUnixTimestamp(allFills[allFills.length - 1].block_timestamp));
//         }
//     };

//     const downloadTradesAsJSON = () => {
//         const blob = new Blob([JSON.stringify(trades)], { type: 'application/json' });
//         const href = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = href;
//         link.download = 'trades.json';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(href);
//     };

//     useEffect(() => {
//         if (trg && product) {
//             streamFills();
//         }
//     }, [trg, product]);

//     return (
//         <TradeContext.Provider value={{
//             trades, addTrades, streamFills, downloadTradesAsJSON,
//             trg, product, setTrg, setProduct, clearTrades
//         }}>
//             {children}
//         </TradeContext.Provider>
//     );
// };

// export const useTrades = (): TradeContextType => {
//     const context = useContext(TradeContext);
//     if (!context) {
//         throw new Error('useTrades must be used within a TradeProvider');
//     }
//     return context;
// };





import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

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
    trades: { [key: string]: FillType[] };
    addTrades: (product: string, newTrades: FillType[]) => void;
    streamFills: (product: string, beforeTimestamp?: number) => Promise<void>;
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
    const [trg, setTrg] = useState('HyRypoH2B8UPCVvcFqEBFh1E8f7HoHta9tWBJkMa3r7L');
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

    const streamFills = async (product: string, beforeTimestamp?: number, trg: string = 'HyRypoH2B8UPCVvcFqEBFh1E8f7HoHta9tWBJkMa3r7L') => {
        const url = `https://dexterity.hxro.com/fills?product=${product}&trg=${trg}` +
            (beforeTimestamp ? `&before=${beforeTimestamp}` : "");
        const response = await fetch(url);
        const data: FillType[] = (await response.json()).fills;

        addTrades(product, data);

        // If the number of retrieved fills reaches the maximum threshold
        if (data.length === 50) {
            const getUnixTimestamp = (dateString: string): number => {
                const date = new Date(dateString);
                return Math.floor(date.getTime() / 1000);
            };

            // Recursively call streamFills with the timestamp of the last retrieved fill
            streamFills(product, getUnixTimestamp(data[data.length - 1].block_timestamp));
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
            const promises = products.map(product => streamFills(product, undefined, trg));
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