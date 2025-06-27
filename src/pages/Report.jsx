import { useState, useEffect } from 'react';
import SNPTable from '../components/SNPTable';
import Visualizations from '../components/Visualizations';
import { motion } from 'framer-motion';

function Report() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reportData'));
    setReportData(data);
  }, []);

  if (!reportData) {
    return <p className="text-center">No report data available. Please upload a .csv file.</p>;
  }

  const { snpResults, lifestyleResults } = reportData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">Your Personalized Report</h2>
      <h3 className="text-xl font-semibold mb-2">Pharmacogenomic SNPs</h3>
      <SNPTable data={snpResults} />
      <h3 className="text-xl font-semibold mb-2 mt-4">Lifestyle SNPs</h3>
      <SNPTable data={lifestyleResults} />
      <h3 className="text-xl font-semibold mb-2 mt-4">Visualizations</h3>
      <Visualizations snpData={snpResults} lifestyleData={lifestyleResults} />
    </motion.div>
  );
}

export default Report;