import { Input, Button, Navbar, NavbarContent, NavbarItem, Link } from "@heroui/react";
import { Search, Bell, LogOut, Settings, User } from "lucide-react"
import { ThemeSwitcher } from "./ThemeSwitcher";

export const NavbarMenu = () => {
    return (
        <Navbar maxWidth="full" className="bg-navbar flex justify-between">
            <NavbarContent justify="start">
                <Input className="w-80" size="md" placeholder="Search" type="text" startContent={<Search size={14} />} />
                <Button className="bg-primary-500 text-blue-50" size="md">Search</Button>
            </NavbarContent>
            <NavbarContent justify="end" className="">
                <NavbarItem>
                    <Link href="#"><Bell size={18} color="var(--navbar-icon)" /></Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#"><User size={18} color="var(--navbar-icon)" /></Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#"><Settings size={18} color="var(--navbar-icon)" /></Link>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>
                    <Button color="primary" startContent={<LogOut size={18} />}>
                        <Link href="#"></Link>
                        Sign Out
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}