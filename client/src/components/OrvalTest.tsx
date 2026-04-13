import { useGetPurchaseOrders } from "@/api/__generated__/purchase-controller/purchase-controller";
import { Spinner } from "@heroui/react";

export const OrvalTest = () => {
  const { isLoading, data } = useGetPurchaseOrders();
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {JSON.stringify(data)}
        </div>
      )}
    </div>
  );
};