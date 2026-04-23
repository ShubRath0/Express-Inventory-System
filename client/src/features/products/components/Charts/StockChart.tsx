import { Loading } from '@/components';
import { useGetAllProducts } from '@/features/products/hooks';
import { useMemo } from 'react';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const StockChart = () => {
  const { data, isLoading } = useGetAllProducts();

  const response = data?.products;

  const chartData = useMemo(() => {
    if (!response) return [];

    const produce = response
      .filter(p => p.category === "PRODUCE")
      .reduce((acc, p) => acc + p.stock!, 0);

    const plastic = response
      .filter(p => p.category === "PLASTIC")
      .reduce((acc, p) => acc + p.stock!, 0);

    return [
      { name: "Produce", value: produce, fill: 'var(--chart-produce)' },
      { name: "Plastic", value: plastic, fill: 'var(--chart-plastic)' }
    ];
  }, [data]);

  if (isLoading) return <Loading label='Fetching data...' />;

  return (
    <ResponsiveContainer>
      <PieChart>
        <Tooltip
          cursor={{ strokeOpacity: 0, fillOpacity: 0 }}
          contentStyle={{
            backgroundColor: "var(--card)",
            border: 'none',
            borderRadius: '12px',
          }}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          stroke="none"
          cornerRadius={6}
          label={({ name, percent }) =>
            percent && percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : null
          }
          labelLine={false}
        >
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};