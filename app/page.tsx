
import HeroSection from './components/Hero'
import TradeTable from './components/table'
import { TradeProvider } from './Context/Context'
import DemoArea from './components/PriceChart'
import BidAskPieChart from './components/TakerPieChart'
import VolumeOverTimeBarGraph from './components/VolumeBarChart'
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
        </div>
      </TradeProvider>
    </>
  )
}
