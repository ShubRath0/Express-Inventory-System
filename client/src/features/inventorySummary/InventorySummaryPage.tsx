import { Header } from "@/components";
import { InventoryTable } from "./components/inventoryTable";

export const InventorySummaryPage = () => {
  return (
    <section className="w-full h-full p-4  flex flex-col gap-4">
        <Header title="Inventory Summary" />
        <InventoryTable />
    </section>
  );
};
