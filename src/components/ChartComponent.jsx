import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const sampleData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Heart Rate (bpm)',
      data: [72, 75, 78, 80, 76, 74, 77],
      fill: false,
      borderColor: '#667eea',
      tension: 0.3,
      pointBackgroundColor: '#764ba2',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'top' },
    title: { display: true, text: 'Weekly Heart Rate Trend' },
  },
  scales: {
    y: { beginAtZero: true, title: { display: true, text: 'BPM' } },
    x: { title: { display: true, text: 'Day' } },
  },
};

const ChartComponent = () => {
  return (
    <div style={{height:260, background:'#fafafa', border:'1px dashed #ddd', borderRadius:8, padding:16}}>
      <Line data={sampleData} options={options} />
    </div>
  );
};

export default ChartComponent;
