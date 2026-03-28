import type { RootState } from "@/app/Store";
import { setSelectedCategories } from "@/features/products/state";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, type SharedSelection } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

export const FilterBtn = () => {

    const { selectedCategories } = useSelector((state: RootState) => state.filters);
    const dispatch = useDispatch();

    const handleSelectionChange = (keys: SharedSelection) => {
        let selectedArray = Array.from(keys) as string[];
        const lastSelected = selectedArray[selectedArray.length - 1];

        if (lastSelected === "Low" || lastSelected === "Empty") {
            selectedArray = selectedArray.filter(key => key !== "Good");
        } else if (lastSelected === "Good") {
            selectedArray = selectedArray.filter(key => key !== "Low" && key !== "Empty");
        }

        if (lastSelected === "Produce") {
            selectedArray = selectedArray.filter(key => key !== 'Plastic');
        } else if (lastSelected == "Plastic") {
            selectedArray = selectedArray.filter(key => key !== 'Produce');
        }

        dispatch(setSelectedCategories(selectedArray));
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
                selectedKeys={new Set(selectedCategories)}
                onSelectionChange={handleSelectionChange}
            >
                <DropdownSection title="Categories">
                    <DropdownItem key="Produce">Produce</DropdownItem>
                    <DropdownItem key="Plastic">Plastic</DropdownItem>
                </DropdownSection>
                <DropdownSection title="Stock Status">
                    <DropdownItem key="Low">Low</DropdownItem>
                    <DropdownItem key="Good">Good</DropdownItem>
                    <DropdownItem key="Empty">Empty</DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};