import { Loading, ProductStatsBanner, ScrollContainer, Section, SectionContainer } from "@/components";
import { HealthChart, ProfitChart, StockChart } from "@/features/products/components/Charts";
import { useProducts } from "@/features/products/hooks";
import { Divider } from "@heroui/react";
import { motion } from "framer-motion";

export const DashboardPage = () => {
    const { isLoading } = useProducts();
    if (isLoading) return <Loading label="Fetching Data..." />;

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

    return (
        <ScrollContainer>

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
        </ScrollContainer>
    );
};