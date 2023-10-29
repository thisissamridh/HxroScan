'use client'
import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import { useTrades } from '../../../Context/Context';

const transformTradeDataToActivity = (trades: { [key: string]: any[] }): Array<any> => {
    const activity: Array<any> = [];

    // Convert trade data to the required format
    for (const product in trades) {
        trades[product].forEach((trade) => {
            const date = trade.block_timestamp.split("T")[0]; // Extracting the date from the timestamp
            const existingActivity = activity.find((a) => a.date === date);

            if (existingActivity) {
                existingActivity.count += 1;
            } else {
                activity.push({
                    date,
                    count: 1,
                    level: 0 // Default level, can be adjusted based on the trade volume
                });
            }
        });
    }

    // Adjust the level based on count
    activity.forEach((a) => {
        if (a.count <= 5) {
            a.level = 1;
        } else if (a.count <= 15) {
            a.level = 2;
        } else if (a.count <= 30) {
            a.level = 3;
        } else {
            a.level = 4;
        }
    });

    return activity;
};

const TradeActivityCalendar: React.FC = () => {
    const { trades } = useTrades();
    const transformedData = transformTradeDataToActivity(trades);

    return (
        <div>
            <h2>Trade Activity Calendar</h2>
            <GitHubCalendar
                username="dummy" // This is required by the component but not used in our case
                transformData={() => transformedData}
            />
        </div>
    );
};

export default TradeActivityCalendar;
