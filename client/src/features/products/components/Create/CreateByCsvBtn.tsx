import { useProductActions } from "@/features/products/hooks";
import { forwardRef, type ChangeEvent } from "react";

export interface CreateByCsvBtnHandle {
    triggerClick: () => void;
}

export const CreateByCsvBtn = forwardRef<HTMLInputElement>((props, ref) => {
    const { onUploadCsv } = useProductActions();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onUploadCsv(file);
            event.target.value = "";
        }
    };

    return (
        <input
            type="file"
            accept=".csv"
            ref={ref}
            onChange={handleFileChange}
            style={{ display: "none" }}
        />
    );
});