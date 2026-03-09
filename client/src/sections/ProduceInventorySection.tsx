
// TYPES
import type { Product } from "@/api/products/types";

// COMPONENTS
import { Divider } from "@heroui/react";
import { Loading } from "@/components/brandons-component-library";
import { SearchBar } from "@/components/brandons-component-library";
import { ProductTable } from "@/components/brandons-component-library";
import { ProductStatsBanner } from "@/components/brandons-component-library";
import { CreateProductAction } from "@/components/brandons-component-library";

// HOOKS
import { useSearchSort } from "@/hooks/useSearchSort";
import { useProducts } from "@/hooks/useProducts"

// MAIN SECTION
export const InventorySection = () => {
    const { products, isLoading } = useProducts();
    const { items, sortColumn, sortDirection, setSortColumn, setSortDirection, setSearch } = useSearchSort<Product>({ items: products, searchableKeys: ["id", "name", "stock", "price", "category"] });

    if (isLoading) return <Loading label="Loading Products..." />

    return (
        // CONTAINER
        <div className="flex flex-col h-full w-full p-4">

            {/* TOP SECTION */}
            <div className="flex flex-row items-center justify-between gap-4">

                {/* SEARCH BAR */}
                <SearchBar
                    onChange={setSearch}
                    placeholder="Search Items"
                    className="w-[15%]"
                />

                {/* STATS */}

                <ProductStatsBanner products={items} />

                <CreateProductAction />

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