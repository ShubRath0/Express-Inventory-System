import { GenericBreadCrumbs, GenericNavbar } from "@/components";
import NotificationDropdown from "@/components/AppShell/Navbar/NotificationDropdown";
import { ThemeSwitcher } from "@/components/ui";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@heroui/react";
import { Items, type NavbarProps } from "./NavItemList";

export const AppNavbar = () => {
  function renderItem(item: NavbarProps) {
    return (
      <Dropdown key={item.key}>
        <DropdownTrigger>{item.icon}</DropdownTrigger>
        <DropdownMenu>
          {item.subItems
            ? item.subItems.map((subItem) => (
                <DropdownItem key={subItem.key}>
                  <Link href={subItem.href} className="flex gap-3">
                    {subItem.icon}
                    <p className="text-gray-400">{subItem.label}</p>
                  </Link>
                </DropdownItem>
              ))
            : null}
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <GenericNavbar>
      <GenericNavbar.Start>
        <GenericBreadCrumbs />
      </GenericNavbar.Start>
      <GenericNavbar.End>
        <ThemeSwitcher />
        <NotificationDropdown />
        {Items.map((item) => renderItem(item))}
        <Avatar size="sm" name="John Doe" className="bg-blue-50 text-blue" />
      </GenericNavbar.End>
    </GenericNavbar>
  );
};
