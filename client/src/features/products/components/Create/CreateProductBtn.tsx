import { Button, useDisclosure } from "@heroui/react";
import { useCreateProduct } from "@/features/products/hooks/useProducts";
import { CreateProductModal } from "./CreateProductModal";
import { useToast } from "@/hooks/useToast";
import type { Category, PostProduct } from "@/features/products/api/products.types";
import type { ProductFormData } from "./CreateProductForm";

export const CreateProductBtn = () => {
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

            <CreateProductModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={onSubmit}
            />
        </>
    );
};