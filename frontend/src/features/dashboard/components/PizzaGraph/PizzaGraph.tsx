import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import { common_theme } from '../../../../shared/styles/theme.js'


ChartJS.register(ArcElement, Tooltip, Legend, Title)

interface SimpleData {
  name: string
  values: number[]
  labels?: string[]
}

interface Props {
  data: SimpleData
  className?: string
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const },
    title: { display: false },
  },
}

export default function PizzaGraph({ data, className }: Props) {
  const labels = data.labels || data.values.map((_, i) => `#${i + 1}`)
  const colors = [
    common_theme.strong_pink,
    common_theme.piggy_pink,
    common_theme.purple_purple,
    common_theme.good_green,
    common_theme.bad_red,
  ]

  const chartData = {
    labels,
    datasets: [
      {
        label: data.name,
        data: data.values,
        backgroundColor: data.values.map((_, i) => colors[i % colors.length]),
        borderWidth: 0,
      },
    ],
  }

  return (
      <Pie data={chartData} options={options} />
  )
}
