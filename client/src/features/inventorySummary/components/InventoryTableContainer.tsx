import { useGetAllProducts } from "@/api/__generated__/product-controller/product-controller";
import { Loading } from "@/components";
import { InventoryTable } from "./inventoryTable";

export const InventoryTableContainer = () => {
  const { data, isLoading, isError } = useGetAllProducts({ size: 1000 });
  
  if (isLoading) {
    return <Loading label="Loading products..." />;
  }

  if (isError) {
    return <div>Failed to load products</div>;
  }

  return <InventoryTable data={data?.data?.content || []} />;
};
