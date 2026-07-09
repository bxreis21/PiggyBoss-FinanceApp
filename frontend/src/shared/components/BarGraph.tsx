import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { dark_theme, common_theme} from '../../shared/styles/theme.js';

interface SimpleData {
  name: string;
  values: number[];
  labels?: string[];
}

type BarGraphProps = {
  data: SimpleData;
};

export default function BarGraph({ data }: BarGraphProps) {
  const formattedData = data.values.map((value, index) => ({
    name: data.labels?.[index] || `#${index + 1}`,
    [data.name]: value,
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }} 
            contentStyle={{ backgroundColor: dark_theme.dark_tech, borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <Bar 
            dataKey={data.name} 
            fill={common_theme.strong_pink}
            radius={[6, 6, 0, 0]} 
            maxBarSize={40} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}