import { useGetProductSummary } from "@/api/__generated__/product-controller/product-controller";
import type { RootState } from "@/app/Store";
import { type StatCardProps, GenericStatBanner } from "@/components";
import { Boxes, CircleDollarSign, Package, Ticket } from "lucide-react";
import { useSelector } from "react-redux";

export const FilteredStatsBanner = () => {
  const { searchTerm } = useSelector((root: RootState) => root.filters);
  const { data } = useGetProductSummary({ search: searchTerm });
  const totalItems = data?.data?.totalProducts || 0;
  const totalStock = data?.data?.totalStock || 0;
  const totalUnitPrice = data?.data?.totalUnitPrice || 0;
  const totalValue = data?.data?.totalInventoryValue || 0;

  const stats: StatCardProps[] = [
    {
      statName: "Total Filtered Items",
      statValue: totalItems,
      icon: Package,
      className: "bg-cyan50 text-cyan-500 p-2 rounded-md",
    },
    {
      statName: "Total Filtered Stock",
      statValue: totalStock,
      icon: Boxes,
      render: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      className: "bg-green50 text-green-500 p-2 rounded-md",
    },
    {
      statName: "Total Filtered Unit Price",
      statValue: totalUnitPrice,
      icon: Ticket,
      render: (v) =>
        `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      className: "bg-indigo50 text-indigo-500 p-2 rounded-md",
    },
    {
      statName: "Total Filtered Value",
      statValue: totalValue,
      icon: CircleDollarSign,
      render: (v) =>
        `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      className: "bg-yellow50 text-yellow-500 p-2 rounded-md",
    },
  ];
  return <GenericStatBanner stats={stats} />;
};
