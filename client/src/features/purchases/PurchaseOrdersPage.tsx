import { ScrollContainer } from "@/components";
import { SectionHeader } from "@/features/products/components/ui/SectionHeader";
import { CreatePoButton } from "@/features/purchases/components/CreatePoButton";
import { PurchaseOrderTable } from "@/features/purchases/components/PurchaseOrderTable";
import { DatePicker } from "@heroui/react";
import { motion } from 'framer-motion';

export const PurchaseOrdersPage = () => {


  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto bg-background">
      <ScrollContainer>

        <SectionHeader title="Purchase Orders" />

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, ease: "backInOut" }}
        >
          <section className="flex flex-col gap-4 p-6 pb-2">
            <div className="flex flex-row items-center justify-between gap-4">

              <div className="flex flex-1 gap-4 items-center">
              </div>

              {/* CREATE , EXPORT, NUKE */}
              <DatePicker className="w-[15%]" />
              <CreatePoButton />

            </div>
          </section>
        </motion.div>

        <PurchaseOrderTable />
      </ScrollContainer>
    </div>

  );
};