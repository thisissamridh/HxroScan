'use client'

import React from 'react';
import { Card, Col, Row, Tooltip } from 'antd';
import { useTrades } from '../../Context/Context';
import { DollarCircleOutlined, BarChartOutlined, InfoCircleOutlined, ShoppingCartOutlined, SwapOutlined } from '@ant-design/icons';

function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

const Overview: React.FC = () => {
    const { trades } = useTrades();

    const allTrades = Object.values(trades).flat();
    const totalVolume = allTrades.reduce((acc, trade) => acc + (trade.base_size * trade.price), 0);
    const averagePrice = allTrades.reduce((acc, trade) => acc + trade.price, 0) / allTrades.length;

    const productVolumes = Object.entries(trades).map(([product, trades]) => ({
        product,
        volume: trades.reduce((acc, trade) => acc + (trade.base_size * trade.price), 0)
    }));

    const mostTradedProduct = productVolumes.reduce((max, product) => product.volume > max.volume ? product : max, productVolumes[0]);

    const bidTrades = allTrades.filter(trade => trade.taker_side === 'ask').length;
    const askTrades = allTrades.filter(trade => trade.taker_side === 'bid').length;
    return (
        <Row gutter={16}>
            <Col xs={24} md={12} lg={6} className="mb-4">
                <Card title={
                    <Tooltip title="The total volume of all trades">
                        <><DollarCircleOutlined /> Total Traded Volume <InfoCircleOutlined /></>
                    </Tooltip>
                } bordered={false} className="text-center shadow-lg border border-gray-300 p-2">
                    {formatNumber(totalVolume)}
                </Card>
            </Col>
            <Col xs={24} md={12} lg={6} className="mb-4">
                <Card title={
                    <Tooltip title="The average price across all trades">
                        <><BarChartOutlined /> Average Trade Price <InfoCircleOutlined /></>
                    </Tooltip>
                } bordered={false} className="text-center shadow-lg border border-gray-300 p-2">
                    ${formatNumber(averagePrice)}
                </Card>
            </Col>
            <Col xs={24} md={12} lg={6} className="mb-4">
                <Card title={
                    <Tooltip title="The product with the highest trade volume">
                        <><ShoppingCartOutlined /> Most Traded Product <InfoCircleOutlined /></>
                    </Tooltip>
                } bordered={false} className="text-center shadow-lg border border-gray-300 p-2">
                    {mostTradedProduct.product}
                    <Tooltip title={`$${formatNumber(mostTradedProduct.volume)}`}>
                        <InfoCircleOutlined style={{ marginLeft: '10px' }} />
                    </Tooltip>
                </Card>
            </Col>
            <Col xs={24} md={12} lg={6} className="mb-4">
                <Card title={
                    <Tooltip title="The distribution of buy vs sell trades">
                        <><SwapOutlined /> Trade Stance <InfoCircleOutlined /></>
                    </Tooltip>
                } bordered={false} className="text-center shadow-lg border border-gray-300 p-2">
                    {bidTrades} Buy / {askTrades} Sell
                </Card>
            </Col>
        </Row>
    );
};

export default Overview;