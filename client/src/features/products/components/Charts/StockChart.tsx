import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useProductContext } from '../../context/ProductProvider';

export const StockChart = () => {
    const { products } = useProductContext();
    const produceItems = products.filter(p => p.category === "PRODUCE").reduce((acc, p) => acc + p.stock, 0)
    const plasticItems = products.filter(p => p.category === "PLASTIC").reduce((acc, p) => acc + p.stock, 0)

    const chartData = [
        { name: "Produce", value: produceItems, fill: 'var(--chart-produce)' },
        { name: "Plastic", value: plasticItems, fill: 'var(--chart-plastic)' }
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Tooltip
                    cursor={false}
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
                >
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}