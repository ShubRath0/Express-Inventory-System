import { Input, Button, Navbar, NavbarContent, NavbarItem, Link } from "@heroui/react";
import { Search, Bell, LogOut, Settings, User } from "lucide-react"

export const NavbarMenu = () => {
    return (
        <Navbar maxWidth="full" className="bg-white flex justify-between">
            <NavbarContent justify="start">
                <Input className="w-80" size="sm" placeholder="Search" type="text" startContent={<Search size={14}/>}/>
                <Button className="bg-primary-500 text-blue-50" size="sm">Search</Button>
            </NavbarContent>
            <NavbarContent  justify="end" className="">
                <NavbarItem>
                    <Link href="#"><Bell size={18} color="#001731" /></Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#"><User size={18} color="#001731" /></Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#"><Settings size={18} color="#001731" /></Link>
                </NavbarItem>
                <NavbarItem>
                    <Button className="bg-blue-50" startContent={<LogOut size={18} color="#006FEE"/>}>
                        <Link href="#">Sign out</Link>
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar> 
    )
}