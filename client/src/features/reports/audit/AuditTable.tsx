import { useGetAuditLogs } from "@/api/__generated__/audit-log-controller/audit-log-controller";
import type { AuditLog } from "@/api/__generated__/types.schemas";
import { GenericTable, Header, ScrollContainer, type ColumnDef } from "@/components";
import { setSortColumn, setSortDirection } from "@/features/products";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

export const AuditTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useGetAuditLogs({ page: currentPage });
  const auditLogs = data?.data?.content;
  const dispatch = useDispatch();

  const columns = useMemo<ColumnDef<AuditLog>[]>(() => [
    {
      key: "id",
      label: "ID"
    },
    {
      key: "userId",
      label: "UserID"
    },
    {
      key: "action",
      label: "Action"
    },
    {
      key: "entity",
      label: "Entity Affected"
    },
    {
      key: "createdAt",
      label: "Timestamp",
      render: (value) => {
        if (!value) return "-";

        return new Date(value as string).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }
  ], []);

  return (
    <ScrollContainer>
      <Header title="Audit" />
      <GenericTable
        columns={columns}
        getRowId={(item) => item.id!}
        items={auditLogs || []}
        page={data?.data?.number}
        pages={data?.data?.totalPages}
        sortDirection="ascending"
        setSortColumn={(col) => dispatch(setSortColumn(col))}
        setSortDirection={(dir) => dispatch(setSortDirection(dir))}
        onChange={setCurrentPage}
      />
    </ScrollContainer>

  );
};