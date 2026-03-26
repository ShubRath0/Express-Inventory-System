// COMPONENTS
import { Loading, ProductStatsBanner, ScrollContainer, Section, SectionContainer } from "@/components";
import { Divider } from "@heroui/react";
import { CreateByCsvBtn, CreateProductBtn, FilterBtn, HealthChart, ProductTable, ProfitChart, StockChart } from "./components";
import { InventorySearchbar } from "./components/ui/InventorySearchbar";
import { useProductContext } from "./context/ProductProvider";

// MAIN SECTION
export const ProductInventorySection = () => {

    const { isLoading } = useProductContext();

    if (isLoading) return <Loading label="Fetching Data..." />

    return (
        // CONTAINER
        <div className="flex flex-col h-full p-4 overflow-y-auto bg-background">

            <ScrollContainer>

                {/* KPI's */}
                <SectionContainer>
                    <ProductStatsBanner />
                </SectionContainer>

                <Divider />

                {/* CHARTS */}
                <SectionContainer size="xs">

                    {/* Stock Chart */}
                    <Section size="lg">
                        <h3 className="text-sm font-medium text-gray-400 mb-4">Stock Distribution</h3>
                        <div className="h-full">
                            <StockChart />
                        </div>
                    </Section>

                    {/* Profit Chart */}
                    <Section size="lg">
                        <h3 className="text-sm font-medium text-gray-400 mb-4">Total Inventory Value</h3>
                        <div className="h-full">
                            <ProfitChart />
                        </div>
                    </Section>

                    {/* Cool ass Chart */}
                    <Section size="lg">
                        <h3 className="text-sm font-medium text-gray-400 mb-4">Health Check</h3>
                        <div className="flex h-full justify-center items-center">
                            <HealthChart />
                        </div>
                    </Section>

                </SectionContainer>

                <Divider />

                <section className="flex flex-col gap-4 p-6 pb-2">
                    <div className="flex flex-row items-center justify-between gap-4">

                        {/* SEARCH BAR */}
                        <div className="flex flex-1 gap-4 items-center">
                            <InventorySearchbar />
                            {/* FILTER BUTTON (CATEGORY) */}
                            <FilterBtn />
                        </div>

                        {/* CREATE BTN */}
                        <CreateProductBtn />
                        <CreateByCsvBtn />
                    </div>
                </section>

                <Divider />

                {/* TABLE */}
                <section className="pb-10">
                    <ProductTable />
                </section>
            </ScrollContainer>
        </div >

    )
}