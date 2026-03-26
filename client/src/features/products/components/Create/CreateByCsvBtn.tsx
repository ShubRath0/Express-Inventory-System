import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import { useModalContext } from "../../context/ModalProvider";

export const CreateByCsvBtn = () => {

    const { onUploadCsv } = useModalContext();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target.files?.[0];
        onUploadCsv(file!);
    }

    return (
        <>
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <Button
                color="primary"
                size="lg"
                startContent={<Plus />}
                onPress={handleButtonClick}
            >
                Add By CSV
            </Button>
        </>

    )
}