import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { common_theme } from '../../../../shared/styles/theme.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface SimpleData {
  name: string
  values: number[]
  labels?: string[]
}

interface Props {
  data: SimpleData
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
  }
}

export default function BarGraph({ data }: Props) {
  const labels = data.labels || data.values.map((_, i) => `#${i + 1}`)
  const barColor = common_theme.piggy_pink
  const chartData = {
    labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: barColor,
      },
    ],
  }

  return (
        <Bar data={chartData} options={options} />
  )
}
