import { Select, SelectItem, type SelectedItemProps } from "@heroui/react";

interface SelectProps extends SelectedItemProps {
  value: string;
  label: string;
}

export const SelectRoleOptions: SelectProps[] = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "viewer", label: "Viewer" },
  { value: "stock_counter", label: "Stock Counter" },
];

export const SelectOptions = () => {
    return (
        <Select label="Select a role">
            {SelectRoleOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
        </Select>
    )

};
