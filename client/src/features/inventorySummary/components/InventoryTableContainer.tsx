import { useGetAllProducts } from "@/api/__generated__/product-controller/product-controller";
import { Loading } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { InventoryTable } from "./inventoryTable";

export const InventoryTableContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => useGetAllProducts({ size: 1000 }),
  });

  if (isLoading) {
    return <Loading label="Loading products..." />;
  }

  if (isError) {
    return <div>Failed to load products</div>;
  }

  return <InventoryTable data={data?.data?.data?.content || []} />;
};
