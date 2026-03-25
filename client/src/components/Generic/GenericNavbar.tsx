import { Navbar, NavbarContent, NavbarItem } from "@heroui/react"
import React from "react";

type NavbarSectionProps = {
    children: React.ReactNode;
};

export const GenericNavbar = ({ children }: { children: React.ReactNode }) => {
    return (
        <Navbar maxWidth="full" className="bg-navbar">
            {children}
        </Navbar>
    )
}

const Start = ({ children }: NavbarSectionProps) => (
    <NavbarContent justify="start">
        {React.Children.map(children, (child, i) => (
            <NavbarItem key={i}>{child}</NavbarItem>
        ))}
    </NavbarContent>
);

const Center = ({ children }: NavbarSectionProps) => (
    <NavbarContent justify="center">
        {React.Children.map(children, (child, i) => (
            <NavbarItem key={i}>{child}</NavbarItem>
        ))}
    </NavbarContent>
);

const End = ({ children }: NavbarSectionProps) => (
    <NavbarContent justify="end">
        {React.Children.map(children, (child, i) => (
            <NavbarItem key={i}>{child}</NavbarItem>
        ))}
    </NavbarContent>
);

GenericNavbar.Start = Start;
GenericNavbar.Center = Center;
GenericNavbar.End = End;