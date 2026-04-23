import { ProductStatsBanner, ScrollContainer, Section, SectionContainer } from "@/components";
import { HealthChart, ProfitChart, StockChart } from "@/features/products/components/Charts";
import { Divider } from "@heroui/react";
import { motion } from "framer-motion";

export const DashboardPage = () => {

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
            <StockChart />
          </Section>

          <Section size="lg" title="Health Check">
            <HealthChart />
          </Section>
        </SectionContainer>
      </motion.div>

      <Divider />
    </ScrollContainer>
  );
};