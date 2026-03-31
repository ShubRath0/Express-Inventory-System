import type { RootState } from "@/app/Store";
import { setSelectedCategories, setSelectedLevels } from "@/features/products/state";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, type SharedSelection } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";

export const FilterBtn = () => {

    const { selectedCategories, selectedLevels } = useSelector((state: RootState) => state.filters);
    const allSelectedKeys = new Set([...selectedCategories, ...selectedLevels]);
    const dispatch = useDispatch();

    const handleSelectionChange = (keys: SharedSelection) => {
        const selectedArray = Array.from(keys) as string[];
        const lastSelected = selectedArray.find(key => !allSelectedKeys.has(key));

        const levelGroup = ["Low", "Good", "Empty"];
        const categoryGroup = ["Produce", "Plastic"];

        let newLevels = selectedArray.filter(key => levelGroup.includes(key));
        let newCategories = selectedArray.filter(key => categoryGroup.includes(key));

        if (lastSelected) {
            if (lastSelected === "Good") {
                newLevels = ["Good"];
            } else if (lastSelected === "Low" || lastSelected === "Empty") {
                newLevels = newLevels.filter(k => k !== "Good");
            }

            if (lastSelected === "Produce") {
                newCategories = ["Produce"];
            } else if (lastSelected === "Plastic") {
                newCategories = ["Plastic"];
            }
        }

        dispatch(setSelectedLevels(newLevels));
        dispatch(setSelectedCategories(newCategories));
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
                selectedKeys={new Set(allSelectedKeys)}
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