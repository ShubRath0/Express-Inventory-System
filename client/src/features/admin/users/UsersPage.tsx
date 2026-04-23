import { Header } from "@/components";
import { UsersTableNav } from "@/features/admin/components/UsersTableNav";
import { DisplayUsers } from "@/features/admin/users/DisplayUsers";
import { motion } from "framer-motion";

export const UsersPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-full p-6 flex flex-col gap-6"
    >
        <Header title="Users & Roles" />
        <UsersTableNav />
      <DisplayUsers />
    </motion.section>
  );
};
