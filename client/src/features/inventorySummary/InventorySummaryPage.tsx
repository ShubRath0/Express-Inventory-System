import { Header } from "@/components";
import { InventoryNav } from "@/features/inventorySummary/components/inventoryNav";
import { InventoryTable } from "./components/inventoryTable";

export const InventorySummaryPage = () => {
  return (
    <section className="w-full h-full p-4  flex flex-col gap-4">
      <Header title="Inventory Summary" />
      <InventoryNav />
      <InventoryTable />
    </section>
  );
};
