import { Button, useDisclosure } from "@heroui/react";
import { ThemeSwitcher } from "../ui/ThemeSwitcher"
import { GenericNavbar } from "./GenericNavbar"

export const RequestNavbar = () => {

    return (
        <GenericNavbar
            startContent={[<p>Requests</p>]}
            endContent={[
                <Button
                    color="primary"
                    variant="solid"
                    radius="sm"
                >
                    Create Request
                </Button>,
                <ThemeSwitcher />,
            ]}
        />
    )
}