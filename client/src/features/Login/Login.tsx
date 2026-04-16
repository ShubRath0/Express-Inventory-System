import { useNavigate } from "react-router-dom";
import { LoginForm, LoginHeader, LoginFooter } from "./index";

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    navigate("/dashboard");
  };

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
