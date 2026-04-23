import type { UserDTO } from "@/api/__generated__/types.schemas";

export const ColumnsList: { key: keyof UserDTO; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },   
  { key: "role", label: "Role" },
];