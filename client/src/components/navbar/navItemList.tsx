import type { NavbarProps } from "@components/navbar/navbarProps";
import { Bell, Settings, User} from "lucide-react";

export const Items: NavbarProps[] = [
  {
    key: "notifications",
    href: "notifications",
    icon: <Bell size={18} color="#001731" />,
  },
  {
    key: "user",
    href: "user",
    icon: <User size={18} color="#001731" />,
  },
  {
    key: "settings",
    href: "settings",
    icon: <Settings size={18} color="#001731" />,
  },
];
