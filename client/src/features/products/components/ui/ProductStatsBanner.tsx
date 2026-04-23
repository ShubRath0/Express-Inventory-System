import { useGetProductSummary } from "@/api/__generated__/product-controller/product-controller";
import { type StatCardProps, GenericStatBanner, Loading } from "@/components";
import { Boxes, CircleDollarSign, Package, Ticket } from "lucide-react";

export const ProductStatsBanner = () => {

  const { data, isLoading } = useGetProductSummary();
  if (isLoading) return <Loading label="Fetching summary..." />;
  const response = data?.data!;

  const stats: StatCardProps[] = [
    {
      statName: "Total Items",
      statValue: response.totalProducts,
      icon: Package
    },
    {
      statName: "Total Stock",
      statValue: response.totalStock,
      icon: Boxes,
      render: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 2 })
    },
    {
      statName: "Total Unit Price",
      statValue: response.totalUnitPrice,
      icon: Ticket,
      render: (v) => `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    },
    {
      statName: "Total Value",
      statValue: response.totalInventoryValue,
      icon: CircleDollarSign,
      render: (v) => `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
    }
  ];
  return (
    <GenericStatBanner
      stats={stats}
    />
  );
};