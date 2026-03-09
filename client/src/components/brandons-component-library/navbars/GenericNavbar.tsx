import { Navbar, NavbarContent, NavbarItem } from "@heroui/react"

export type GenericNavbarProps = {
    startContent?: React.ReactNode[]
    centerContent?: React.ReactNode[]
    endContent?: React.ReactNode[]
}

export const GenericNavbar = ({
    startContent,
    centerContent,
    endContent
}: GenericNavbarProps) => {
    return (
        <Navbar isBordered maxWidth="full">
            <NavbarContent>
                <NavbarContent justify="start">
                    {startContent?.map((content, index) => (
                        <NavbarItem key={index}>
                            {content}
                        </NavbarItem>
                    ))}
                </NavbarContent>

                <NavbarContent justify="center">
                    {centerContent?.map((content, index) => (
                        <NavbarItem key={index}>
                            {content}
                        </NavbarItem>
                    ))}
                </NavbarContent>

                <NavbarContent justify="end">
                    {endContent?.map((content, index) => (
                        <NavbarItem key={index}>
                            {content}
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </NavbarContent>
        </Navbar>
    )
}