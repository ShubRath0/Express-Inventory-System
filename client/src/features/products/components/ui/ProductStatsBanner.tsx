import type { Product } from "@/features/products/api/products.types";
import { useProductStats } from "@/features/products/hooks/useProducts";
import { StatCard, type StatCardProps } from "../../../../components/ui/StatCard";
import { Boxes, CircleDollarSign, Package, Ticket } from "lucide-react";

export type ProductStatsBannerProps = {
    products: Product[]
}

export const ProductStatsBanner = ({
    products
}: ProductStatsBannerProps) => {
    const { totalStock, totalUnitPrice, totalValue, totalProducts } = useProductStats({ products });

    const stats: StatCardProps[] = [
        { statName: "Total Items", statValue: totalProducts, render: (v: number) => `${v.toFixed(0)}`, icon: Package },
        { statName: "Total Stock", statValue: totalStock, icon: Boxes },
        { statName: "Total Unit Price", statValue: totalUnitPrice, render: (v: number) => `$${v.toFixed(2)}`, icon: Ticket },
        { statName: "Total Value", statValue: totalValue, render: (v: number) => `$${v.toFixed(2)}`, icon: CircleDollarSign }
    ]

    return (
        <div className="grid grid-cols-4 gap-4">
            {
                stats.map((stat) => (
                    <StatCard
                        key={stat.statName}
                        statName={stat.statName}
                        statValue={stat.statValue}
                        render={stat.render}
                        icon={stat.icon}
                    />
                ))
            }
        </div>
    )
}