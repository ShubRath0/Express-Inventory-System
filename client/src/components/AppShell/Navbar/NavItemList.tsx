import { Settings, User } from "lucide-react";

export interface NavbarProps {
  key: string;
  href: string;
  icon?: React.ReactNode;
}
export const Items: NavbarProps[] = [
<<<<<<< HEAD
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
=======
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
>>>>>>> master
];
