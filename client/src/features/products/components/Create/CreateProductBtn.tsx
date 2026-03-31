import { useModalActions } from "@/hooks/useModalActions";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Plus, Upload } from "lucide-react";
import type { Key } from "react";

interface CreateProductBtnProps {
    onCsvClick: () => void;
}

export const CreateProductBtn = ({ onCsvClick }: CreateProductBtnProps) => {
    const { openModal } = useModalActions();

    const onAction = (key: Key) => {
        switch (key) {
            case 'create':
                openModal('create');
                break;
            case 'csv':
                onCsvClick();
                break;
        }
    };

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
                    Add Item
                </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={onAction}>
                <DropdownItem key="create" startContent={<Plus />}>Create</DropdownItem>
                <DropdownItem key="csv" startContent={<Upload />}>Upload CSV</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};