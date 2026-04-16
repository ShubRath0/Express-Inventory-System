import { useLogin } from "@/api/__generated__/auth-controller/auth-controller";
import type { LoginRequest } from "@/api/__generated__/types.schemas";
import { Loading } from "@/components";
import { useNavigate } from "react-router-dom";
import { LoginFooter, LoginForm, LoginHeader } from "./index";

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError, isPending } = useLogin();

  const handleSubmit = async (data: LoginRequest) => {
    await mutateAsync({ data });
    navigate("/dashboard");
  };

  if (isPending) {
    return <Loading label="Signing in..." />;
  }
  if (isError) {
    return <div>Failed to sign in user</div>;
  }

  return (
    <div className="flex h-screen w-screen">
      <div
        id="form-container"
        className="w-1/2 flex flex-col justify-center gap-5 p-20"
      >
        <LoginHeader />
        <LoginForm onSubmit={handleSubmit} />
      </div>
      <div className="h-screen w-1/2 flex flex-col items-center justify-center text-center">
        <LoginFooter />
      </div>
    </div>
  );
};
