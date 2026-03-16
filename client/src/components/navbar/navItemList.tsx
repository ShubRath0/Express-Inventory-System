import type { NavbarProps } from "@components/navbar/navbarProps";
import { Bell, Settings, User } from "lucide-react";

export const Items: NavbarProps[] = [
  {
    key: "notifications",
    href: "notifications",
    icon: <Bell size={18} color="var(--color-navbar-foreground)" />,
  },
  {
    key: "user",
    href: "user",
    icon: <User size={18} color="var(--color-navbar-foreground)" />,
  },
  {
    key: "settings",
    href: "settings",
    icon: <Settings size={18} color="var(--color-navbar-foreground)" />,
  },
];
