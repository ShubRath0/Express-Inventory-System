import { getAllProducts } from "@/api/__generated__/product-controller/product-controller";
import { useQuery } from "@tanstack/react-query";
import { InventoryTable } from "./inventoryTable";
import { Loading } from "@/components";

export const InventoryTableContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  if (isLoading) {
    return <Loading label="Loading products..." />;
  }

  if (isError) {
    return <div>Failed to load products</div>;
  }

  return <InventoryTable data={data?.data || []} />;
};
