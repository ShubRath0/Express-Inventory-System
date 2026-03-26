import { Checkbox, Link } from "@heroui/react";
import type { User } from "./api/user.type.tsx";
import { GenericForm, type FormField } from "@/components/Generic/index.ts";

const loginFields: FormField<User>[] = [
  {
    key: "email",
    type: "email",
    label: "Email",
    required: true,
  },
  {
    key: "password",
    type: "text",
    label: "Password",
    required: true,
  },
];

export type LoginFormProps = {
  onSubmit: (values: User) => void;
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <>
      <GenericForm
        fields={loginFields}
        onSubmit={onSubmit}
        submitText="Sign In"
        submitColor="primary"
      />
      <div className="flex justify-between">
        <Checkbox>Keep me signed in</Checkbox>
        <Link>Forgot password?</Link>
      </div>
    </>
  );
};
