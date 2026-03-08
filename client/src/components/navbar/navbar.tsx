import {
  Input,
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import { Search, LogOut } from "lucide-react";
import { Items } from "@components/navbar/navItemList";

export const NavbarMenu = () => {
  return (
    <Navbar maxWidth="full" className="bg-white flex justify-between">
      <NavbarContent justify="start">
        <Input
          className="w-80"
          size="md"
          placeholder="Search"
          type="text"
          startContent={<Search size={14} />}
        />
        <Button className="bg-primary-500 text-blue-50" size="md">
          Search
        </Button>
      </NavbarContent>
      <NavbarContent justify="end">
        {Items.map((item) => (
          <NavbarItem key={item.key}>
            <Link href={item.href}>{item.icon}</Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <Button
            className="bg-blue-50"
            startContent={<LogOut size={18} color="#006FEE" />}
          >
            <Link href="#">Sign out</Link>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
