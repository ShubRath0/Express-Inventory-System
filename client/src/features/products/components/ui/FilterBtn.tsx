import type { RootState } from "@/app/Store";
import { setCategory, setStockStatuses } from "@/features/products/state";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, type SharedSelection } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

export const FilterBtn = () => {

  const { category, stockStatus } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  const handleSelectionChange = (keys: SharedSelection) => {
    const selectedArray = Array.from(keys) as string[];

    const stockStatuses = ['NO_STOCK', 'LOW_STOCK', 'ABOVE_THRESHOLD'];
    const categoryKeys = ['PRODUCE', 'PLASTIC'];

    const lastStock = selectedArray.filter(k => stockStatuses.includes(k)).pop();
    const lastCategory = selectedArray.filter(k => categoryKeys.includes(k)).pop();

    dispatch(setStockStatuses(lastStock ?? undefined));
    dispatch(setCategory(lastCategory ?? undefined));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" variant="flat" size="lg">
          Filter
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Filter Options"
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={new Set([category, stockStatus].filter(Boolean) as string[])}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownSection title="Categories">
          <DropdownItem key="PRODUCE">Produce</DropdownItem>
          <DropdownItem key="PLASTIC">Plastic</DropdownItem>
        </DropdownSection>
        <DropdownSection title="Stock Status">
          <DropdownItem key="LOW_STOCK">Low</DropdownItem>
          <DropdownItem key="ABOVE_THRESHOLD">Good</DropdownItem>
          <DropdownItem key="NO_STOCK">Empty</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};