import { Button } from "@heroui/react";
import { useCreateProduct } from "@/features/products/hooks/useProducts";
import { CreateProductModal } from "./CreateProductModal";
import { useToast } from "@/hooks/useToast";
import type { Category, PostProduct } from "@/features/products/api/products.types";
import type { ProductFormData } from "./CreateProductForm";
import { Plus } from "lucide-react";
import { useInventory } from "../../context";

export const CreateProductBtn = () => {
    const { openModal } = useInventory();
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
                color="primary"
                variant="solid"
                radius="sm"
                onPress={() => openModal('create')}
                size="lg"
                startContent={<Plus />}
            >
                Add Item
            </Button>

            <CreateProductModal
                onSubmit={onSubmit}
            />
        </>
    );
};