import { Button, DateRangePicker, Input } from "@heroui/react";
import { Download, Search } from "lucide-react";

export const InventoryNav = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <Input
        startContent={<Search size={16} />}
        label="Search inventory"
        className="w-85"
      />

      <div className="flex justify-between gap-4 align-center">
        <DateRangePicker variant="bordered" label="Date created" labelPlacement="inside"/>
        <Button
          className="w-full"
          color="primary"
          variant="solid"
          size="lg"
          startContent={<Download size={16} />}
        >
          Export
        </Button>
      </div>
    </div>
  );
};
