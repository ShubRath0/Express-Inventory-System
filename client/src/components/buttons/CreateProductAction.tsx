import { Button, useDisclosure } from "@heroui/react";
import { useCreateProduct } from "@/hooks/useProducts";
import { ProductModal } from "../modals/ProductModal";
import { useToast } from "@/hooks/useToast";
import type { ProductFormData } from "../forms/ProductForm";
import type { Category, PostProduct } from "@/api/products/types";

export const CreateProductAction = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const createMutation = useCreateProduct();
    const toast = useToast();

    const onSubmit = async (data: ProductFormData) => {
        const newProduct: PostProduct = {
            name: data.name,
            category: data.category as Category,
            stock: data.stock,
            lowStockThreshold: data.lowStockThreshold,
            price: data.price
        };

        toast.promise(createMutation.mutateAsync(newProduct), {
            loading: "Creating product...",
            success: "Product created!",
            error: "Product could not be created."
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

            <ProductModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={onSubmit}
            />
        </>
    );
};