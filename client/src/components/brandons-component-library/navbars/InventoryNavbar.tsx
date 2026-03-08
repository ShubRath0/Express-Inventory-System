import { Button, useDisclosure } from "@heroui/react";
import { ThemeSwitcher } from "../ui/ThemeSwitcher"
import { GenericNavbar } from "./GenericNavbar"
import { useCreateProduct } from "@/hooks/useProducts";
import { type ProductFormData } from "../forms/ProductForm";
import type { Category, PostProduct } from "@/api/products/types";
import { ProductModal } from "../modals/ProductModal";
import { useToast } from "@/hooks/useToast";

export const InventoryNavbar = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const createMutation = useCreateProduct()
    const toast = useToast()
    const onSubmit = async (data: ProductFormData) => {

        const newProduct: PostProduct = {
            name: data.name,
            category: data.category as Category,
            stock: data.stock,
            lowStockThreshold: data.lowStockThreshold,
            price: data.price
        }

        toast.promise(createMutation.mutateAsync(newProduct), {
            loading: "Creating product...",
            success: "Product created!",
            error: "Product could not be created."
        })
    }

    return (
        <GenericNavbar
            startContent={[<p>Inventory</p>]}
            endContent={[
                <Button
                    color="primary"
                    variant="solid"
                    radius="sm"
                    onPress={() => onOpen()}
                >Add Item</Button>,
                <ThemeSwitcher />,
                <ProductModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onSubmit={onSubmit}
                />
            ]}
        />
    )
}