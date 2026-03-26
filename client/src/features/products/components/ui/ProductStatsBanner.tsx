import { Boxes, CircleDollarSign, Package, Ticket } from "lucide-react";
import { StatCard, type StatCardProps } from "../../../../components/ui/StatCard";
import { useStatContext } from "../../context/StatProvider";
export const ProductStatsBanner = () => {
    const { totalStock, totalUnitPrice, totalValue, totalProducts } = useStatContext();

    const stats: StatCardProps[] = [
        { statName: "Total Items", statValue: totalProducts, render: (v: number) => `${v.toFixed(0)}`, icon: Package },
        { statName: "Total Stock", statValue: totalStock, icon: Boxes },
        { statName: "Total Unit Price", statValue: totalUnitPrice, render: (v: number) => `$${v.toFixed(2)}`, icon: Ticket },
        { statName: "Total Value", statValue: totalValue, render: (v: number) => `$${v.toFixed(2)}`, icon: CircleDollarSign }
    ]

    return (
        <>
            {
                stats.map((stat, index) => (
                    <StatCard
                        key={stat.statName}
                        statName={stat.statName}
                        statValue={stat.statValue}
                        render={stat.render}
                        icon={stat.icon}
                        index={index}
                    />

                ))
            }
        </>
    )
}