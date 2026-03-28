import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useProducts } from '../../hooks';
import { setSelectedCategories } from '../../state';

interface StockChart {
    onChartClick: () => void;
}

interface ChartData {
    name: string,
    value: number,
    fill: string,
}

export const StockChart = ({ onChartClick }: StockChart) => {
    const { products } = useProducts();

    const dispatch = useDispatch();

    const chartData = useMemo(() => {
        const produce = products
            .filter(p => p.category === "PRODUCE")
            .reduce((acc, p) => acc + p.stock, 0);

        const plastic = products
            .filter(p => p.category === "PLASTIC")
            .reduce((acc, p) => acc + p.stock, 0);

        return [
            { name: "Produce", value: produce, fill: 'var(--chart-produce)' },
            { name: "Plastic", value: plastic, fill: 'var(--chart-plastic)' }
        ];
    }, [products]);

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
                    onClick={(a) => {
                        dispatch(setSelectedCategories([a.payload.name]));
                        onChartClick();
                    }}
                >
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};