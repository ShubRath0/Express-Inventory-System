import { Button, Link } from "@heroui/react";
import { LogOut } from "lucide-react";
import { ThemeSwitcher } from "@/components/ui";
import { GenericNavbar, GenericBreadCrumbs } from "@/components";
import { Items } from "./NavItemList";

export const AppNavbar = () => {
  return (
    <GenericNavbar>
      <GenericNavbar.Start>
        <GenericBreadCrumbs />
      </GenericNavbar.Start>
      <GenericNavbar.End>
        <ThemeSwitcher />
        {Items.map((item) => (
          <Link key={item.key} href={item.href} >
            {item.icon}
          </Link>
        ))}
        <Button
          className="bg-blue-50"
          startContent={<LogOut size={18} color="#006FEE" />}
        >
          <Link href="#">Sign out</Link>
        </Button>
      </GenericNavbar.End>
    </GenericNavbar>
  );
};
