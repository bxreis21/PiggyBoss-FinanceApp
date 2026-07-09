import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { common_theme, dark_theme } from '../styles/theme.js';

interface SimpleData {
  name: string
  values: number[]
  labels?: string[]
}

interface Props {
  data: SimpleData
  className?: string
}

export default function PizzaGraph({ data, className }: Props) {
  const colors = [
    common_theme.strong_pink,
    common_theme.piggy_pink,
    common_theme.purple_purple,
    common_theme.good_green,
    common_theme.bad_red,
  ];

  const formattedData = data.values.map((value, index) => ({
    name: data.labels?.[index] || `#${index + 1}`,
    value: value,
    fill: colors[index % colors.length],
  }));

  return (
    <div className={`w-full h-full ${className || ''}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip 
            contentStyle={{ backgroundColor: dark_theme.dark_tech, borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-gray-600 text-sm">{value}</span>}
          />
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}