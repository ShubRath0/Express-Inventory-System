import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Plus } from "lucide-react";

export const CreatePoButton = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="primary"
          variant="solid"
          radius="sm"
          size="lg"
          startContent={<Plus />}
        >
          Add PO
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="create" startContent={<Plus />}>Create</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};