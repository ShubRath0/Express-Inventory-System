import { Loading } from "@/components";

import { useLogin } from "@/features/auth/useLogin";
import { LoginFooter, LoginForm, LoginHeader } from "./index";

export const Login = () => {
  const { login, isLoading: isPending, isError } = useLogin();

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
        <LoginForm onSubmit={login} />
      </div>
      <div className="h-screen w-1/2 flex flex-col items-center justify-center text-center">
        <LoginFooter />
      </div>
    </div>
  );
};
