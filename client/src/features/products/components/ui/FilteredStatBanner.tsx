import { type StatCardProps, GenericStatBanner } from "@/components";
import { useFilteredInventory, useProductStats } from "@/features/products/hooks";
import { Boxes, CircleDollarSign, Package, Ticket } from "lucide-react";

export const FilteredStatsBanner = () => {
    const filteredProducts = useFilteredInventory();
    const { totalStock, totalUnitPrice, totalValue, totalProducts } = useProductStats(filteredProducts);

    const stats: StatCardProps[] = [
        {
            statName: "Total Filtered Items",
            statValue: totalProducts,
            icon: Package
        },
        {
            statName: "Total Filtered Stock",
            statValue: totalStock,
            icon: Boxes,
            render: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 2 })
        },
        {
            statName: "Total Filtered Unit Price",
            statValue: totalUnitPrice,
            icon: Ticket,
            render: (v) => `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
        },
        {
            statName: "Total Filtered Value",
            statValue: totalValue,
            icon: CircleDollarSign,
            render: (v) => `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
        }
    ];
    return (
        <GenericStatBanner stats={stats} />
    );
};