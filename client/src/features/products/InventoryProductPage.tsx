// COMPONENTS
import { Loading, ScrollContainer, SectionContainer } from "@/components";
import { CreateByCsvBtn, CreateProductBtn, CreateProductModal, DeleteAlert, FilterBtn, FilteredStatsBanner, InventorySearchbar, ProductTable, UpdateStockModal } from "@/features/products/components";
import { ExportBtn } from "@/features/products/components/Export/ExportBtn";
import { NukeBtn } from "@/features/products/components/ui/NukeBtn";
import { useProducts } from "@/features/products/hooks";
import { Divider } from "@heroui/react";
import { motion } from 'framer-motion';
import { useRef } from "react";

// MAIN SECTION
export const ProductInventorySection = () => {
    const { isLoading } = useProducts();

    const csvInputRef = useRef<HTMLInputElement>(null);

    if (isLoading) return <Loading label="Fetching Data..." />;

    return (
        // CONTAINER
        <div className="flex flex-col h-full p-4 overflow-y-auto bg-background">

            <ScrollContainer id="main-content-viewport">

                {/* FILTERED KPIs */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.3, ease: "backInOut" }}
                >
                    <SectionContainer>
                        <FilteredStatsBanner />
                    </SectionContainer>
                </motion.div>

                {/* SEARCH, FILTER, CREATE, EXPORT */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.3, ease: "backInOut" }}
                >
                    <section className="flex flex-col gap-4 p-6 pb-2">
                        <div className="flex flex-row items-center justify-between gap-4">

                            <div className="flex flex-1 gap-4 items-center">
                                <InventorySearchbar />
                                <FilterBtn />
                            </div>

                            {/* CREATE , EXPORT, NUKE */}
                            <CreateProductBtn onCsvClick={() => csvInputRef.current?.click()} />
                            <ExportBtn />
                            <NukeBtn />
                        </div>
                    </section>
                </motion.div>

                <Divider />

                {/* TABLE */}
                <section id="inventory-table" className="pb-10">
                    <ProductTable />
                </section>

            </ScrollContainer>

            {/* OTHER */}
            <section>
                <CreateByCsvBtn ref={csvInputRef} />
                <CreateProductModal />
                <UpdateStockModal />
                <DeleteAlert />
            </section>

        </div >

    );
};