
// TYPES
import type { Product } from "@/features/products/api/products.types";

// COMPONENTS
import { Divider } from "@heroui/react";
import { Loading, ProductStatsBanner, SearchBar } from "@/components";
import { CreateProductBtn, ProductTable } from "./components";

// HOOKS
import { useSearchSort } from "@/hooks/useSearchSort";
import { useProducts } from "./hooks/useProducts"

// MAIN SECTION
export const ProductInventorySection = () => {
    const { products, isLoading } = useProducts();
    const { items, sortColumn, sortDirection, setSortColumn, setSortDirection, setSearch } = useSearchSort<Product>({ items: products, searchableKeys: ["id", "name", "category"] });

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

                <CreateProductBtn />
            </div>

            {/* DIVIDER */}

            <div className="m-4">
                <ProductStatsBanner products={items} />
            </div>

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