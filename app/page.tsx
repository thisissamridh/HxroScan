
import HeroSection from './components/Hero'
import TradeTable from './components/table'
import { TradeProvider } from './Context/Context'
import DemoArea from './components/PriceChart'
import BidAskPieChart from './components/TakerPieChart'
import VolumeOverTimeBarGraph from './components/VolumeBarChart'
import TradeDistributionPieChart from './components/TradeDistributionPieChart'
import BaseSizeDistributionHistogram from './components/BaseSizeHistogram'
import TradeActivityCalendar from './components/Activity'
import Overview from './components/Overview'
export default function Home() {
  return (
    <>
      <TradeProvider >
        <HeroSection />
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <TradeTable />
          <DemoArea />
          <BidAskPieChart />
          <VolumeOverTimeBarGraph />
          <TradeDistributionPieChart />
          <BaseSizeDistributionHistogram />
          <Overview />
          <TradeActivityCalendar />
        </div>
      </TradeProvider>
    </>
  )
}
