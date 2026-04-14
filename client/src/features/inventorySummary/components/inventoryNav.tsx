import { Button, DateRangePicker, Input } from "@heroui/react";
import { Download, Search } from "lucide-react";

export const InventoryNav = () => {
  return (
    <div className="flex flex-row justify-between items-baseline">
      <Input
        startContent={<Search size={16} />}
        label="Search items"
        className="w-85"
      />

      <div className="flex justify-between gap-1">
        <DateRangePicker variant="bordered" />
        <Button color="primary" startContent={<Download className="w-16 h-16" />} variant="shadow" size="md">
          Export
        </Button>
      </div>
    </div>
  );
};
