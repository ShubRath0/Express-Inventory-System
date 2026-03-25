import { useState } from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useProductContext } from "../../context/ProductProvider";

export const HealthChart = () => {
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    const { products } = useProductContext();
    const healthy = products.filter((product) => product.stock >= product.lowStockThreshold).length;
    const lowStock = products.filter((product) => product.stock !== 0 && product.stock < product.lowStockThreshold).length;
    const empty = products.filter((product) => product.stock === 0).length;

    const counts = [healthy, lowStock, empty];
    const activeSegments = counts.filter(num => num > 0).length;
    const paddingAngle = (isAnimated && activeSegments <= 1 ? 0 : 5);

    console.log(activeSegments, isAnimated)
    console.log(paddingAngle)

    const chartData = [
        { name: "healthy", value: healthy, fill: 'var(--status-healthy)' },
        { name: "Low", value: lowStock, fill: 'var(--status-low)' },
        { name: "Empty", value: empty, fill: 'var(--status-empty)' }
    ]

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
                    paddingAngle={paddingAngle}
                    cornerRadius={6}
                    stroke="none"
                    onAnimationStart={() => setIsAnimated(false)}
                    onAnimationEnd={() => setIsAnimated(true)}
                >
                </Pie>
            </PieChart>
        </ResponsiveContainer>

    )
}