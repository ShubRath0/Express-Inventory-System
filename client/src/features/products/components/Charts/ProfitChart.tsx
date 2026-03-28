import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getProfits } from "../../api";

export const ProfitChart = () => {
    const profits = getProfits();

    return (
        <ResponsiveContainer>
            <LineChart data={profits}>
                <CartesianGrid />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "var(--card)",
                        border: 'none',
                        borderRadius: '12px'
                    }}
                />
                <Line type="monotone" dataKey="profit" name="Value" stroke="#8884d8" strokeWidth={4} />
            </LineChart>
        </ResponsiveContainer>
    );
};