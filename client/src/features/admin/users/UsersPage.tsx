import { UserDTORole } from "@/api/__generated__/types.schemas";
import { Header } from "@/components";
import { SearchBar } from "@/components/ui";
import { DropDownFilter } from "@/features/admin/users/components/DropDown";
import { UsersTable } from "@/features/admin/users/components/UsersTable";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

export const UsersPage = () => {
  const userRoles: UserDTORole[] = [
    "ADMIN",
    "MANAGER",
    "VIEWER",
    "STOCK_COUNTER",
  ];
  const [selectedRole, setSelectedRole] = useState<UserDTORole>();

  const handleRoleChange = (role?: UserDTORole) => {
    setSelectedRole(role);
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-full p-6 flex flex-col gap-6"
    >
      <Header title="User Management" />
      <div className="flex justify-between">
        <SearchBar
          onChange={() => {}}
          placeholder="Search by name or email"
          className="w-[20%] h-1.5"
        />
        <div className="flex gap-4">
          <DropDownFilter
            selectedRole={selectedRole}
            userRoles={userRoles}
            handleRoleChange={handleRoleChange}
          />
          <Button
            variant="solid"
            color="primary"
            startContent={<Plus size={16} />}
          >
            Add User
          </Button>
        </div>
      </div>
      <UsersTable selectedRole={selectedRole} />
    </motion.section>
  );
};
