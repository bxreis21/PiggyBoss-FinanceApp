import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const chartData = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun', 'jul'],
  datasets: [
      {
          label: 'Spending',
          data: [400, 450, 500, 550, 600, 650, 600],
          backgroundColor: 'rgba(236,72,153,0.9)',
          borderRadius: 6,
          barPercentage: 0.6,
      }
  ]
}

type BarGraphProps = {
  data?: ChartData<'bar'>;
};

export default function BarGraph({ data = chartData }: BarGraphProps) {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-full h-full'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
