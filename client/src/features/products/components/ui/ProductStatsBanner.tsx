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
      icon: Package,
      className: "bg-cyan50 text-cyan-500 p-2 rounded-md",
    },
    {
      statName: "Total Stock",
      statValue: response.totalStock,
      icon: Boxes,
      render: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      className: "bg-green50 text-green-500 p-2 rounded-md",
    },
    {
      statName: "Total Unit Price",
      statValue: response.totalUnitPrice,
      icon: Ticket,
      render: (v) =>
        `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      className: "bg-indigo50 text-indigo-500 p-2 rounded-md",
    },
    {
      statName: "Total Value",
      statValue: response.totalInventoryValue,
      icon: CircleDollarSign,
      render: (v) =>
        `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      className: "bg-yellow50 text-yellow-500 p-2 rounded-md",
    },
  ];
  return <GenericStatBanner stats={stats} />;
};
