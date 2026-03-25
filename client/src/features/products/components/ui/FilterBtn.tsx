import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, type SharedSelection } from "@heroui/react";
import { useInventory } from "../../context";

export const FilterBtn = () => {

    const { selectedCategories, setSelectedCategories } = useInventory();

    const handleSelectionChange = (keys: SharedSelection) => {
        const newSet = new Set(Array.from(keys) as string[]);

        const lastSelected = Array.from(keys).pop();

        if (lastSelected === "low") {
            newSet.delete("good")
        } else if (lastSelected === "good") {
            newSet.delete("low")
        }

        setSelectedCategories(newSet as unknown as SharedSelection)
    }

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
                selectedKeys={selectedCategories}
                onSelectionChange={handleSelectionChange}
            >
                <DropdownSection title="Categories">
                    <DropdownItem key="produce">Produce</DropdownItem>
                    <DropdownItem key="plastic">Plastic</DropdownItem>
                </DropdownSection>
                <DropdownSection title="Stock Status">
                    <DropdownItem key="low">Low Stock</DropdownItem>
                    <DropdownItem key="good">Good Stock</DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};