import logo from "../../../assets/Logo.svg";

export const LoginHeader = () => {
  return (
    <div aria-label="form-header" className="flex flex-col gap-8">
      <div aria-label="logo">
        <img src={logo} alt="Logo" className="w-[45px]" />
      </div>
      <div aria-label="header-title-container" className="flex flex-col gap-2">
        <h1 className="text-3xl">Welcome back</h1>
        <p className="text-sm text-default">
          Please sign in to view your inventory.
        </p>
      </div>
    </div>
  );
};
