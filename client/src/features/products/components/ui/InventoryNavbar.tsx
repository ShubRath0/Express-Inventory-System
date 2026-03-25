import { Button, useDisclosure } from "@heroui/react";
import { ThemeSwitcher } from "../../../../components/ui/ThemeSwitcher"
import { GenericNavbar } from "../../../../components/Generic/GenericNavbar"
import { useCreateProduct } from "@/features/products/hooks/useProducts";
import { type ProductFormData, CreateProductModal } from "..";
import type { Category, PostProduct } from "@/features/products/api/products.types";
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
        <GenericNavbar>

            <GenericNavbar.Start>
                <p>Inventory</p>
            </GenericNavbar.Start>

            <GenericNavbar.End>
                <Button
                    color="primary"
                    variant="solid"
                    radius="sm"
                    onPress={() => onOpen()}
                >
                    Add Item
                </Button>
                <ThemeSwitcher />
                <CreateProductModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onSubmit={onSubmit}
                />
            </GenericNavbar.End>

        </GenericNavbar>
    )
}