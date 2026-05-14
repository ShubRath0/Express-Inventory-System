import { Settings, User, LogOut } from "lucide-react";

interface Items {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  isExpanded?: boolean;
}

export interface NavbarProps {
  key: string;
  icon?: React.ReactNode;
  subItems?: Items[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const Items: NavbarProps[] = [
  {
    key: "settings",
    icon: <Settings size={18} color="var(--color-navbar-foreground)" />,
    subItems: [
      {
        key: "user",
        href: "user",
        label: "User profile",
        icon: <User size={18} color="#A1A1AA" />,
        isExpanded: false,
      },
      {
        key: "logout",
        href: "logout",
        label: "Logout",
        icon: <LogOut size={18} color="#A1A1AA" />,
      },
    ],
  },
];
