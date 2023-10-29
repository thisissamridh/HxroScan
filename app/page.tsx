
import HeroSection from './components/Sections/Hero'
import TradeTable from './components/Tables/table'
import { TradeProvider } from './Context/Context'
import DemoArea from './components/Charts/LineCharts/PriceChart'
import BidAskPieChart from './components/Charts/PieCharts/TakerPieChart'
import VolumeOverTimeBarGraph from './components/Charts/LineCharts/VolumeBarChart'
import TradeDistributionPieChart from './components/Charts/PieCharts/TradeDistributionPieChart'
import BaseSizeDistributionHistogram from './components/Charts/LineCharts/BaseSizeHistogram'
import TradeActivityCalendar from './components/Utils/Calendar/Activity'
import Overview from './components/OverView/Overview'
export default function Home() {
  return (
    <>

      <TradeProvider >
        <HeroSection />
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <Overview />
        </div>
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <TradeTable />
        </div>
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <DemoArea />
        </div>
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <BidAskPieChart />
        </div>
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <VolumeOverTimeBarGraph />
        </div>
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <TradeDistributionPieChart />
        </div>
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <BaseSizeDistributionHistogram />
        </div>

        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <TradeActivityCalendar />
        </div>
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
        </div>
      </TradeProvider>
    </>
  )
}
