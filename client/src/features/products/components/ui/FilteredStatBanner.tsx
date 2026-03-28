import { GenericStatBanner } from "@/components";
import { Boxes, CircleDollarSign, Package, Ticket } from "lucide-react";
import { type StatCardProps } from "../../../../components/ui/StatCard";
import { useFilteredInventory, useProductStats } from "../../hooks";
export const FilteredStatsBanner = () => {
    const filteredProducts = useFilteredInventory();
    const { totalStock, totalUnitPrice, totalValue, totalProducts } = useProductStats(filteredProducts);

    const stats: StatCardProps[] = [
        { statName: "Total Filtered Items", statValue: totalProducts, render: (v: number) => `${v.toFixed(0)}`, icon: Package },
        { statName: "Total Filtered Stock", statValue: totalStock, icon: Boxes },
        { statName: "Total Filtered Unit Price", statValue: totalUnitPrice, render: (v: number) => `$${v.toFixed(2)}`, icon: Ticket },
        { statName: "Total Filtered Value", statValue: totalValue, render: (v: number) => `$${v.toFixed(2)}`, icon: CircleDollarSign }
    ];

    return (
        <GenericStatBanner stats={stats} />
    );
};