import type { UserDTORole } from "@/api/__generated__/types.schemas";
import { SearchBar } from "@/components";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const UsersTableNav = () => {
  const userRoles: UserDTORole[] = [
    "ADMIN",
    "MANAGER",
    "VIEWER",
    "STOCK_COUNTER",
  ];
  const [selectedRole, setSelectedRole] = useState<UserDTORole | null>(null);

  const handleRoleChange = (role: UserDTORole) => {
    setSelectedRole(role);
  };
    

  return (
    <div className="flex justify-between">
      <SearchBar
        onChange={() => handleRoleChange}
        placeholder="Search Users"
        className="w-[20%]"
      />

      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" color="primary" endContent={<ChevronDown size={12} />}>Roles</Button>
        </DropdownTrigger>
        <DropdownMenu>
          {userRoles.map((role) => (
            <DropdownItem key={role}>{role}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
