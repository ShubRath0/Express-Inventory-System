import { Button, Link } from "@heroui/react";
import { LogOut } from "lucide-react";
import { ThemeSwitcher } from "@/components/ui";
import { GenericNavbar, GenericBreadCrumbs } from "@/components";
import { Items } from "./NavItemList";
import NotificationsDropdown from "./NotificationDropdown";

export const AppNavbar = () => {
  return (
    <GenericNavbar>
      <GenericNavbar.Start>
        <GenericBreadCrumbs />
      </GenericNavbar.Start>

      <GenericNavbar.End>
        <ThemeSwitcher />

      <NotificationsDropdown /> 
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
