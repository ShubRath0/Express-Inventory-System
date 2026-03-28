import { GenericStatBanner } from "@/components";
import { Boxes, CircleDollarSign, Package, Ticket } from "lucide-react";
import { type StatCardProps } from "../../../../components/ui/StatCard";
import { useProducts, useProductStats } from "../../hooks";
export const ProductStatsBanner = () => {
    const { products } = useProducts();
    const { totalStock, totalUnitPrice, totalValue, totalProducts } = useProductStats(products);

    const stats: StatCardProps[] = [
        { statName: "Total Items", statValue: totalProducts, render: (v: number) => `${v.toFixed(0)}`, icon: Package },
        { statName: "Total Stock", statValue: totalStock, icon: Boxes },
        { statName: "Total Unit Price", statValue: totalUnitPrice, render: (v: number) => `$${v.toFixed(2)}`, icon: Ticket },
        { statName: "Total Value", statValue: totalValue, render: (v: number) => `$${v.toFixed(2)}`, icon: CircleDollarSign }
    ];

    return (
        <GenericStatBanner
            stats={stats}
        />
    );
};