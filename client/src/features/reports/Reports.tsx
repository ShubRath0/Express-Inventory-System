import { Header } from "@/components";
import { ReportsList } from "./Card";
import { motion } from "framer-motion";

export const Reports = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="h-full p-6"
    >
      <div className="flex flex-col gap-4">
        <Header title="Reports" />
        <ReportsList />
      </div>
    </motion.section>
  );
};
