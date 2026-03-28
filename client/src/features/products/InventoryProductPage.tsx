// COMPONENTS
import { Loading, ProductStatsBanner, ScrollContainer, Section, SectionContainer } from "@/components";
import { Divider } from "@heroui/react";
import { CreateByCsvBtn, CreateProductBtn, FilterBtn, HealthChart, ProductTable, ProfitChart, StockChart } from "./components";
import { FilteredStatsBanner } from "./components/ui/FilteredStatBanner";
import { InventorySearchbar } from "./components/ui/InventorySearchbar";
import { useProducts } from "./hooks";

// MAIN SECTION
export const ProductInventorySection = () => {
    const { isLoading } = useProducts();


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

                {/* KPI's */}
                <SectionContainer>
                    <ProductStatsBanner />
                </SectionContainer>

                <Divider />

                {/* CHARTS */}
                <SectionContainer size="xs">

                    {/* Profit Chart */}
                    <Section size="lg" title="Daily Inventory Value">
                        <ProfitChart />
                    </Section>

                    {/* Stock Chart */}
                    <Section size="lg" title="Stock Distribution">
                        <StockChart onChartClick={scrollToTable} />
                    </Section>

                    {/* Cool ass Chart */}
                    <Section size="lg" title="Health Check">
                        <HealthChart onChartClick={scrollToTable} />
                    </Section>
                </SectionContainer>

                <Divider />

                <SectionContainer>
                    <FilteredStatsBanner />
                </SectionContainer>

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
                <section id="inventory-table" className="pb-10">
                    <ProductTable />
                </section>
            </ScrollContainer>
        </div >

    );
};