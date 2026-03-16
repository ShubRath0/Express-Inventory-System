import type { Product } from "@/api/products/types";
import { useProductStats } from "@/hooks/useProducts";
import { StatCard } from "./StatCard";

export type ProductStatsBannerProps = {
    products: Product[]
}

export type Stat = {
    name: string
    value: number
    render?: (v: number) => string
}

export const ProductStatsBanner = ({
    products
}: ProductStatsBannerProps) => {
    const { totalStock, totalUnitPrice, totalValue, totalProducts } = useProductStats({ products });

    const stats: Stat[] = [
        { name: "Total Items", value: totalProducts, render: (v: number) => `${v.toFixed(0)}` },
        { name: "Total Stock", value: totalStock },
        { name: "Total Unit Price", value: totalUnitPrice, render: (v: number) => `$${v.toFixed(2)}` },
        { name: "Total Value", value: totalValue, render: (v: number) => `$${v.toFixed(2)}` }
    ]

    return (
        <div className="flex flex-row gap-4">
            {
                stats.map((stat) => (
                    <StatCard
                        key={stat.name}
                        statName={stat.name}
                        statValue={stat.value}
                        render={stat.render}
                    />
                ))
            }
        </div>
    )
}