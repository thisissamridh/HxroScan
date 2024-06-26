"use client"

import React from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useTrades } from '../../Context/Context';
import { Tooltip } from 'antd';


type Trade = {
    block_timestamp: string;
    product: string;
    taker_side: string;
    price: number;
    quote_size: number;
    base_size: number;
    tx_sig: string;
    taker_trg: string;
    maker_trg: string;
    maker_order_id: string;
};

const TradeTable: React.FC = () => {
    const { trades, downloadTradesAsJSON, setSelectedProduct, selectedProduct } = useTrades();
    const [currentPageSize, setCurrentPageSize] = React.useState(5);

    const combinedTrades = Object.values(trades).flat();
    const lastTradeDate = combinedTrades.length ? combinedTrades[combinedTrades.length - 1]?.block_timestamp : undefined;

    const columns: ColumnsType<Trade> = [
        {
            title: 'Timestamp',
            dataIndex: 'block_timestamp',
            render: (text) => new Date(text).toUTCString(),
        },
        { title: 'Product', dataIndex: 'product' },
        {
            title: 'Taker Side', dataIndex: 'taker_side',

        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            render: (price) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Quote Size ($)',
            dataIndex: 'quote_size',
            render: (quote_size, record) => {
                const calculatedQuoteSize = record.base_size * record.price;
                return `$${calculatedQuoteSize.toFixed(2)}`;
            },
        },
        {
            title: 'Base Size',
            dataIndex: 'base_size',
            render: (base_size) => base_size.toFixed(5),
        },
        {
            title: 'Transaction Signature',
            dataIndex: 'tx_sig',
            render: (tx_sig) => {
                const beginning = tx_sig.substring(0, 6); // first 6 characters
                const end = tx_sig.substring(tx_sig.length - 4); // last 4 characters
                const shortenedSig = `${beginning}...${end}`;

                return (
                    <Tooltip title="Open in SolScan">
                        <a
                            href={`https://solscan.io/tx/${tx_sig}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'blue' }}  // This line sets the color to blue
                        >
                            {shortenedSig}
                        </a>
                    </Tooltip>
                );
            }
        },
        {
            title: 'Taker Trg',
            dataIndex: 'taker_trg',
            render: (taker_trg) => {
                const beginning = taker_trg.substring(0, 6); // first 6 characters
                const end = taker_trg.substring(taker_trg.length - 4); // last 4 characters
                const shortenedTrg = `${beginning}...${end}`;

                return (
                    <Tooltip title={taker_trg}>
                        <a
                            href={`https://solscan.io/account/${taker_trg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'blue' }}  // This line sets the color to blue
                        >
                            {shortenedTrg}
                        </a>
                    </Tooltip>
                );
            }
        },
        {
            title: 'Maker ID', dataIndex: 'maker_order_id',
            render: (maker_order_id) => {
                const beginning = maker_order_id.substring(0, 6); // first 6 characters
                const end = maker_order_id.substring(maker_order_id.length - 4); // last 4 characters
                return `${beginning}...${end}`
            }
        },
    ];
    const handleMenuClick = (product: string) => {
        setSelectedProduct(product);
    };

    const selectedTradesCount = selectedProduct === 'All'
        ? combinedTrades.length
        : trades[selectedProduct]?.length || 0;

    const menu = (
        <Menu onClick={(e) => handleMenuClick(e.key as string)}>
            <Menu.Item key="All">All</Menu.Item>
            <Menu.Item key="BTCUSD-PERP">BTCUSD-PERP</Menu.Item>
            <Menu.Item key="SOLUSD-PERP">SOLUSD-PERP</Menu.Item>
            <Menu.Item key="ETHUSD-PERP">ETHUSD-PERP</Menu.Item>
        </Menu>
    );

    return (
        <div className="overflow-x-auto shadow-xl rounded-lg pt-2 p-4 md:p-8 lg:p-16 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Trade Activity Log</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-700 hidden md:block">
                    <span>
                        Latest {currentPageSize} of total {selectedTradesCount} transactions since{' '}
                        {lastTradeDate ? new Date(lastTradeDate).toLocaleDateString() : 'loading...'}
                    </span>

                </div>
                <div className="flex items-center space-x-4">
                    <Dropdown overlay={menu}>
                        <Button>
                            Filter by Product: {selectedProduct} <span style={{ marginLeft: '10px' }}>▼</span>
                        </Button>
                    </Dropdown>

                    <Button onClick={downloadTradesAsJSON} icon={<DownloadOutlined />}>
                        Download as JSON
                    </Button>
                </div>
            </div>
            <Table
                dataSource={selectedProduct === 'All' ? combinedTrades : trades[selectedProduct]}
                columns={columns}
                rowKey={record => `${record.tx_sig}-${record.maker_order_id}-${record.taker_trg}-${record.maker_trg}`}  // Combined key

                pagination={{
                    pageSizeOptions: ['5', '15', '30'],
                    showSizeChanger: true,
                    defaultPageSize: 5,
                    onShowSizeChange: (_, size) => setCurrentPageSize(size),
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}

            />
        </div>
    );
};

export default TradeTable;
