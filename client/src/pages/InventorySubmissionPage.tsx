import type { InventorySubmission, InventorySubmissionItem } from "@/api/requests/types";
import { InventorySubmissionItemTable } from "@/components/tables/InventorySubmissionItemTable";
import { InventorySubmissionTable } from "@/components/tables/InventorySubmissionTable";
import { Loading } from "@/components/ui/Loading";
import { SearchBar } from "@/components/ui/SearchBar";
import { useInventorySubmissionItems, useInventorySubmissions } from "@/hooks/useInventorySubmissions";
import { useProducts } from "@/hooks/useProducts";
import { useSearchSort } from "@/hooks/useSearchSort";
import { Button, Divider } from "@heroui/react";
import { GitMerge, Undo, X } from "lucide-react";
import { useState } from "react";
export const InventorySubmissionPage = () => {
    const { inventorySubmissions, isLoading: isLoadingSubmissions } =
        useInventorySubmissions()

    const { inventorySubmissionItems, isLoading: isLoadingItems } =
        useInventorySubmissionItems()

    const { products, isLoading: isLoadingProducts } = useProducts();

    const {
        items: filteredSubmissions,
        sortColumn: submissionSortColumn,
        sortDirection: submissionSortDirection,
        setSortColumn: setSubmissionSortColumn,
        setSortDirection: setSubmissionSortDirection,
        setSearch: setSubmissionSearch
    } = useSearchSort<InventorySubmission>({
        items: inventorySubmissions,
        searchableKeys: ["id", "requestedBy", "createdAt", "status"]
    })

    const {
        items: filteredSubmissionItems,
        sortColumn: itemSortColumn,
        sortDirection: itemSortDirection,
        setSortColumn: setItemSortColumn,
        setSortDirection: setItemSortDirection,
        setSearch: setItemSearch
    } = useSearchSort<InventorySubmissionItem>({
        items: inventorySubmissionItems,
        searchableKeys: ["productId", "countedQuantity"]
    })

    const [currentView, setCurrentView] = useState<InventorySubmission | null>(null)

    if (isLoadingSubmissions || isLoadingItems || isLoadingProducts)
        return <Loading label="Loading Data..." />

    return (
        <div className="flex flex-col">

            <div className="flex flex-row gap-4 items-center">
                <SearchBar
                    onChange={currentView ? setItemSearch : setSubmissionSearch}
                    className="w-[15%]"
                    placeholder={
                        currentView ? "Search Items" : "Search Submissions"
                    }
                />

                {currentView && (
                    <div className="flex flex-row gap-4">
                        <Button
                            isIconOnly
                            startContent={<Undo />}
                            color="primary"
                            onPress={() => setCurrentView(null)}
                        />

                        {currentView.status === "PENDING" && (
                            <>
                                <Button startContent={<GitMerge />} color="success">
                                    Merge
                                </Button>
                                <Button startContent={<X />} color="danger">
                                    Deny
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>

            <Divider className="my-4" />

            {currentView ? (
                <InventorySubmissionItemTable
                    inventorySubmissionItems={filteredSubmissionItems.filter(
                        (item) => item.submissionId === currentView.id
                    )}
                    products={products}
                    sortColumn={itemSortColumn}
                    sortDirection={itemSortDirection}
                    setSortColumn={setItemSortColumn}
                    setSortDirection={setItemSortDirection}
                />
            ) : (
                <InventorySubmissionTable
                    inventorySubmissions={filteredSubmissions}
                    sortColumn={submissionSortColumn}
                    sortDirection={submissionSortDirection}
                    setSortColumn={setSubmissionSortColumn}
                    setSortDirection={setSubmissionSortDirection}
                    onPress={(item) => setCurrentView(item)}
                />
            )}
        </div>
    )
}