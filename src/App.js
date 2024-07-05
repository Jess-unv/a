import React, { useRef, useState } from 'react';
import { AuctionBody } from './components/auctions/Body';
import { NavComp } from './components/authentication/NavComp';
import { AuthProvider } from './context/AuthContext';
import BestSellingComputersChart from './components/charts/BestSellingComputersChart';
import OtherChartData1Chart from './components/charts/OtherChartData1Chart';
import OtherChartData2Chart from './components/charts/OtherChartData2Chart';

export const App = () => {
  const [showCharts, setShowCharts] = useState(false);
  const chartsRef = useRef(null);

  const handleViewCharts = () => {
    setShowCharts(true);
    if (chartsRef.current) {
      chartsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AuthProvider>
      <NavComp onViewCharts={handleViewCharts} />
      <AuctionBody />
      {showCharts && (
        <div ref={chartsRef}>
          <BestSellingComputersChart />
          <OtherChartData1Chart />
          <OtherChartData2Chart />
        </div>
      )}
    </AuthProvider>
  );
};

export default App;
