import { Divider } from "@heroui/react";
import { useProducts } from "@hooks/useProducts"
import type { Product } from "@/api/products/types";
import { ProductTable } from "@/components/tables/ProductTable";
import { useSearchSort } from "@/hooks/useSearchSort";
import { Loading } from "@/components/ui/Loading";
import { ProductStatsBanner } from "@/components/ui/ProductStatsBanner";
import { SearchBar } from "@/components/ui/SearchBar";

export const InventoryPage = () => {
    const { products, isLoading } = useProducts();
    const { items, sortColumn, sortDirection, setSortColumn, setSortDirection, setSearch } = useSearchSort<Product>({ items: products, searchableKeys: ["id", "name", "stock", "price", "category"] });

    if (isLoading) return <Loading label="Loading Products..." />

    return (
        // CONTAINER
        <div className="flex flex-col h-full w-full">

            {/* TOP SECTION */}
            <div className="flex flex-row items-center gap-4">

                {/* SEARCH BAR */}
                <SearchBar
                    onChange={setSearch}
                    placeholder="Search Items"
                    className="w-[15%]"
                />

                {/* STATS */}
                <ProductStatsBanner products={items} />

            </div>

            {/* DIVIDER */}
            <Divider className="my-4" />

            {/* TABLE */}
            <ProductTable
                products={items}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                setSortColumn={setSortColumn}
                setSortDirection={setSortDirection}
            />
        </div >
    )
}