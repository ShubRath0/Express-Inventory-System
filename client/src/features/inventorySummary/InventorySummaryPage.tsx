import { Header } from "@/components";
import { InventoryNav } from "@/features/inventorySummary/components/inventoryNav";
import { InventoryTableContainer } from "./components/InventoryTableContainer";
import { motion } from "framer-motion";

export const InventorySummaryPage = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-full p-6 flex flex-col gap-6"
    >
      <Header title="Inventory Summary" />
      <InventoryNav />
      <InventoryTableContainer />
    </motion.section>
  );
};
