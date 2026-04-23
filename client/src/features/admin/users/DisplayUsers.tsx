import { useGetAllUsers } from "@/api/__generated__/user-controller/user-controller";
import { Loading } from "@/components";
import { UsersTable } from "@/features/admin/components/UsersTable";

export const DisplayUsers = () => {
  const { data, isLoading, isError } = useGetAllUsers();
    
  if (isLoading) {
    return <Loading label="Loading users..." />;
  }

  if (isError) {
    return <div>Failed to load users</div>;
  }
  return <UsersTable data={data?.data || []} />;
};
