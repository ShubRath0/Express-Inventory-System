import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useInventory } from "../../context";

export const HealthChart = () => {
    const { products } = useInventory();

    const healthy = products.filter((product) => product.stock >= product.lowStockThreshold).length;
    const lowStock = products.filter((product) => product.stock !== 0 && product.stock < product.lowStockThreshold).length;
    const empty = products.filter((product) => product.stock === 0).length;

    const chartData = [
        { name: "healthy", value: healthy, fill: 'var(--status-healthy)' },
        { name: "Low", value: lowStock, fill: 'var(--status-low)' },
        { name: "Empty", value: empty, fill: 'var(--status-empty)' }
    ]

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={chartData}
                    nameKey="name"
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    cornerRadius={6}
                    stroke="none"
                >
                    <Legend />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--card)",
                            border: 'none',
                            borderRadius: '12px',
                        }}
                    />
                </Pie>
            </PieChart>
        </ResponsiveContainer>

    )
}