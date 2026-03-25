import {
    Button,
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
} from "@heroui/react";
import { LogOut } from "lucide-react";
import { Items } from "./NavItemList";
import { ThemeSwitcher } from "@/components/ui";

export const AppNavbar = () => {
    return (
        <Navbar maxWidth="full" className="bg-navbar flex justify-between">
            {/* END CONTENT */}
            <NavbarContent justify="end">
                {Items.map((item) => (
                    <NavbarItem key={item.key}>
                        <Link href={item.href}>{item.icon}</Link>
                    </NavbarItem>
                ))}
                <ThemeSwitcher />
                <NavbarItem>
                    <Button
                        color="primary"
                        startContent={<LogOut size={18} />}
                    >
                        <Link href="#" className="text-white">Sign out</Link>
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
