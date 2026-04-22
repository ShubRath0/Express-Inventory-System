import { getAllUsers } from "@/api/__generated__/user-controller/user-controller";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components";

export const DisplayUsers = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: () => getAllUsers(),
    });

    if (isLoading) {
        return <Loading label="Loading users..." />;
    }

    if (isError) {
        return <div>Failed to load users</div>;
    }
    return <div>DisplayUsers</div>;
};