import { useGetAllProducts } from "@/features/products/hooks";
import { useMemo } from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export const HealthChart = () => {
  const { data } = useGetAllProducts();
  const response = data?.products;

  const { healthy, lowStock, empty } = useMemo(() => {
    if (!response) return { healthy: 0, lowStock: 0, empty: 0 };

    const healthy = response.filter((product) => product.stock >= product.lowStockThreshold).length;
    const lowStock = response.filter((product) => product.stock !== 0 && product.stock < product.lowStockThreshold).length;
    const empty = response.filter((product) => product.stock === 0).length;

    return {
      healthy,
      lowStock,
      empty
    };
  }, [data]);



  const chartData = [
    { name: "Good", value: healthy, fill: 'var(--status-healthy)' },
    { name: "Low", value: lowStock, fill: 'var(--status-low)' },
    { name: "Empty", value: empty, fill: 'var(--status-empty)' },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Legend />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: 'none',
            borderRadius: '12px',
          }}
        />
        <Pie
          data={chartData}
          nameKey="name"
          dataKey="value"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          cornerRadius={6}
          stroke="none"
          label={({ name, percent }) =>
            percent && percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : null
          }
          labelLine={false}
        >
        </Pie>
      </PieChart>
    </ResponsiveContainer>

  );
};