
import HeroSection from './components/Hero'
import TradeTable from './components/table'
import { TradeProvider } from './Context/Context'

export default function Home() {
  return (
    <>
      <TradeProvider trgPubkey="HyRypoH2B8UPCVvcFqEBFh1E8f7HoHta9tWBJkMa3r7L">
        <HeroSection />
        <div className="p-2 md:p-4 lg:p-8 max-w-screen-xl mx-auto">
          <TradeTable />
        </div>
      </TradeProvider>
    </>
  )
}
