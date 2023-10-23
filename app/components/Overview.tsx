'use client'
import React from 'react';
import { Card, Row, Col } from 'antd';
import { useTrades } from '../Context/Context';

// const Overview: React.FC = () => {
//     const { trades } = useTrades();

//     const allTrades = Object.values(trades).flat();
//     const totalVolume = allTrades.reduce((acc, trade) => acc + trade.quote_size, 0);
//     const averagePrice = allTrades.reduce((acc, trade) => acc + trade.price, 0) / allTrades.length;

//     const productVolumes = Object.entries(trades).map(([product, trades]) => ({
//         product,
//         volume: trades.reduce((acc, trade) => acc + trade.quote_size, 0)
//     }));

//     const mostTradedProduct = productVolumes.reduce((max, product) => product.volume > max.volume ? product : max, productVolumes[0]);

//     const bidTrades = allTrades.filter(trade => trade.taker_side === 'ask').length;
//     const askTrades = allTrades.filter(trade => trade.taker_side === 'bid').length;

//     return (
//         <div className="overview">
//             <Row gutter={[16, 16]}>
//                 <Col span={6}>
//                     <Card title="Total Traded Volume">
//                         {totalVolume}
//                     </Card>
//                 </Col>
//                 <Col span={6}>
//                     <Card title="Average Trade Price">
//                         ${averagePrice.toFixed(2)}
//                     </Card>
//                 </Col>
//                 <Col span={6}>
//                     <Card title="Most Traded Product">
//                         {mostTradedProduct.product} (${mostTradedProduct.volume})
//                     </Card>
//                 </Col>
//                 <Col span={6}>
//                     <Card title="Trade Stance">
//                         {bidTrades} Buy / {askTrades} Sell
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default Overview;



const Overview: React.FC = () => {
    const { trades } = useTrades();

    const allTrades = Object.values(trades).flat();
    // Update totalVolume calculation
    const totalVolume = allTrades.reduce((acc, trade) => acc + (trade.base_size * trade.price), 0);
    const averagePrice = allTrades.reduce((acc, trade) => acc + trade.price, 0) / allTrades.length;

    // Update productVolumes calculation
    const productVolumes = Object.entries(trades).map(([product, trades]) => ({
        product,
        volume: trades.reduce((acc, trade) => acc + (trade.base_size * trade.price), 0)
    }));

    const mostTradedProduct = productVolumes.reduce((max, product) => product.volume > max.volume ? product : max, productVolumes[0]);

    const bidTrades = allTrades.filter(trade => trade.taker_side === 'ask').length;
    const askTrades = allTrades.filter(trade => trade.taker_side === 'bid').length;

    return (
        <div className="overview">
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Card title="Total Traded Volume">
                        {totalVolume}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Average Trade Price">
                        ${averagePrice.toFixed(2)}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Most Traded Product">
                        {mostTradedProduct.product} (${mostTradedProduct.volume})
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Trade Stance">
                        {bidTrades} Buy / {askTrades} Sell
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Overview;
