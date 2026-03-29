import { type StatCardProps, GenericStatBanner } from "@/components";
import { useProducts, useProductStats } from "@/features/products/hooks";
import { Boxes, CircleDollarSign, Package, Ticket } from "lucide-react";

export const ProductStatsBanner = () => {
    const { products } = useProducts();
    const { totalStock, totalUnitPrice, totalValue, totalProducts } = useProductStats(products);

    const stats: StatCardProps[] = [
        {
            statName: "Total Items",
            statValue: totalProducts,
            icon: Package
        },
        {
            statName: "Total Stock",
            statValue: totalStock,
            icon: Boxes,
            render: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 2 })
        },
        {
            statName: "Total Unit Price",
            statValue: totalUnitPrice,
            icon: Ticket,
            render: (v) => `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
        },
        {
            statName: "Total Value",
            statValue: totalValue,
            icon: CircleDollarSign,
            render: (v) => `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
        }
    ];
    return (
        <GenericStatBanner
            stats={stats}
        />
    );
};