import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Visualizations({ snpData, lifestyleData }) {
  const metabolizerData = {
    labels: ['Poor', 'Intermediate', 'Extensive', 'Ultra-rapid'],
    datasets: [{
      data: [
        snpData.filter(d => d.phenotype?.includes('Poor')).length,
        snpData.filter(d => d.phenotype?.includes('Intermediate')).length,
        snpData.filter(d => d.phenotype?.includes('Extensive')).length,
        snpData.filter(d => d.phenotype?.includes('Ultra-rapid')).length,
      ],
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
    }],
  };

  const lifestyleDataChart = {
    labels: lifestyleData.map(d => d.rsid),
    datasets: [{
      label: 'Impact Score',
      data: lifestyleData.map(d => Math.random() * 100),
      backgroundColor: '#3b82f6',
    }],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-bold mb-2">Metabolizer Status</h3>
        <Pie data={metabolizerData} />
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Lifestyle Impact</h3>
        <Bar data={lifestyleDataChart} />
      </div>
    </div>
  );
}

export default Visualizations;