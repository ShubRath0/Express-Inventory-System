import { GenericBreadCrumbs, GenericNavbar } from "@/components";
import NotificationDropdown from "@/components/AppShell/Navbar/NotificationDropdown";
import { ThemeSwitcher } from "@/components/ui";
import { Button, Link } from "@heroui/react";
import { LogOut } from "lucide-react";
import { Items } from "./NavItemList";

export const AppNavbar = () => {
  return (
    <GenericNavbar>
      <GenericNavbar.Start>
        <GenericBreadCrumbs />
      </GenericNavbar.Start>
      <GenericNavbar.End>
        <ThemeSwitcher />
        <NotificationDropdown />
        {Items.map((item) => (
          <Link key={item.key} href={item.href}>
            {item.icon}
          </Link>
        ))}
        <Button
          className="bg-blue text-white"
          startContent={<LogOut size={18} />}
          variant="shadow"
        >
          <Link href="#" className="text-white">
            Sign out
          </Link>
        </Button>
      </GenericNavbar.End>
    </GenericNavbar>
  );
};
