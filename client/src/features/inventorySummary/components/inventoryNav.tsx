import { Button, DateRangePicker, Input } from "@heroui/react";
import { Download, Search } from "lucide-react";

export const InventoryNav = () => {
  return (
    <div className="flex flex-row justify-between items-baseline">
      <Input
        startContent={<Search />}
        label="Search items"
        className="w-[340px]"
      />

      <div className="flex justify-between gap-1">
        <DateRangePicker variant="bordered" />
        <Button color="primary" startContent={<Download size={64} />}>
          Export
        </Button>
      </div>
    </div>
  );
};
