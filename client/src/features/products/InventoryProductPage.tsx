// COMPONENTS
import { Loading, ProductStatsBanner, ScrollContainer, Section, SectionContainer } from "@/components";
import { CreateByCsvBtn, CreateProductBtn, CreateProductModal, DeleteAlert, FilterBtn, FilteredStatsBanner, HealthChart, InventorySearchbar, ProductTable, ProfitChart, StockChart, UpdateStockModal } from "@/features/products/components";
import { ExportBtn } from "@/features/products/components/Export/ExportBtn";
import { NukeBtn } from "@/features/products/components/ui/NukeBtn";
import { useProducts } from "@/features/products/hooks";
import { Divider } from "@heroui/react";
import { motion } from 'framer-motion';
import { useRef } from "react";

// MAIN SECTION
export const ProductInventorySection = () => {
    const { isLoading, products } = useProducts();

    const csvInputRef = useRef<HTMLInputElement>(null);
    const scrollToTable = () => {
        const viewport = document.getElementById('main-content-viewport');
        const table = document.getElementById('inventory-table');

        if (viewport && table) {
            const targetScroll = (table.getBoundingClientRect().top + viewport.scrollTop) - viewport.getBoundingClientRect().top;

            viewport.scrollTo({
                top: targetScroll - 20,
                behavior: "smooth"
            });
        }
    };

    if (isLoading) return <Loading label="Fetching Data..." />;

    return (
        // CONTAINER
        <div className="flex flex-col h-full p-4 overflow-y-auto bg-background">

            <ScrollContainer id="main-content-viewport">

                {products.length > 0 && (
                    <>
                        {/* KPIs */}
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.3, ease: "backInOut" }}
                        >
                            <SectionContainer>
                                <ProductStatsBanner />
                            </SectionContainer>
                        </motion.div>

                        <Divider />

                        {/* CHARTS */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.3, ease: "backInOut" }}
                        >
                            <SectionContainer size="xs">

                                <Section size="lg" title="Daily Inventory Value">
                                    <ProfitChart />
                                </Section>

                                <Section size="lg" title="Stock Distribution">
                                    <StockChart onChartClick={scrollToTable} />
                                </Section>

                                <Section size="lg" title="Health Check">
                                    <HealthChart onChartClick={scrollToTable} />
                                </Section>
                            </SectionContainer>
                        </motion.div>

                        <Divider />

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

                        <Divider />
                    </>
                )}

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