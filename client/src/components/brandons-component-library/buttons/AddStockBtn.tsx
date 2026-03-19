import { Button, useDisclosure } from "@heroui/react";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useToast } from "@/hooks/useToast";
import type { UpdateProduct } from "@/api/products/types";
import type { AddProductFormData } from "../forms/AddProductForm";
import { AddProductModal } from "../modals/AddProductModal";

export const CreateProductAction = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const updateMutation = useUpdateProduct();
    const toast = useToast();

    const onSubmit = async (data: AddProductFormData) => {
        const updatedProduct: UpdateProduct = {
            id: data.
                stock: data.stock,
        };

        toast.promise(updateMutation.mutateAsync(updatedProduct), {
            loading: "Updating product...",
            success: "Product updated!",
            error: "Product could not be updated."
        });
    };

    return (
        <>
            <Button
                color="default"
                variant="solid"
                radius="sm"
                onPress={onOpen}
                size="lg"
            >
                Add Item
            </Button>

            <AddProductModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={onSubmit}
            />
        </>
    );
};