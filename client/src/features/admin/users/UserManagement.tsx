import {
  UserDTORole,
  type SearchUsersParams,
} from "@/api/__generated__/types.schemas";
import { useSearchUsers } from "@/api/__generated__/user-controller/user-controller";
import { Header } from "@/components";
import { SearchBar } from "@/components/ui";
import { DropDownFilter } from "@/features/admin/users/components/DropDown";
import { UsersTable } from "@/features/admin/users/components/UsersTable";
import { Button, useDisclosure } from "@heroui/react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddUser } from "./components/AddUserModal";

export const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState<SearchUsersParams>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSearch = (value: string) => {
    if (!value) {
      setSearchTerm({});
      return;
    }
    if (value.includes("@")) {
      setSearchTerm({ email: value });
    } else {
      setSearchTerm({ name: value });
    }
  };

  const { data, isLoading, isError } = useSearchUsers(searchTerm);

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
          onChange={handleSearch}
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
            size="md"
            onPress={onOpen}
            startContent={<Plus size={16} />}
          >
            Add User
          </Button>
          {isOpen && <AddUser isOpen={isOpen} onOpenChange={onOpenChange} />}
        </div>
      </div>
      <UsersTable
        selectedRole={selectedRole}
        isLoading={isLoading}
        isError={isError}
        data={data}
      />
    </motion.section>
  );
};
