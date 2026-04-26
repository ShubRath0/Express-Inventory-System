import type { UserDTORole } from "@/api/__generated__/types.schemas";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ChevronDown } from "lucide-react";

export const DropDownFilter = ({
  selectedRole,
  userRoles,
  handleRoleChange,
}: {
  selectedRole?: UserDTORole;
  userRoles: UserDTORole[];
  handleRoleChange: (role?: UserDTORole) => void;
}) => {
  const menuItems = [
    <DropdownItem key="ALL" onClick={() => handleRoleChange(undefined)}>
      ALL ROLES
    </DropdownItem>,
    ...userRoles.map((role) => (
      <DropdownItem key={role} onClick={() => handleRoleChange(role)}>
        {role}
      </DropdownItem>
    )),
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          color="default"
          endContent={<ChevronDown size={12} />}
        >
          {selectedRole || "ALL ROLES"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>{menuItems}</DropdownMenu>
    </Dropdown>
  );
};
