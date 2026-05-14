import {
    BadgeQuestionMark,
    ClipboardList,
    House,
    NotebookText,
    SquareUser,
    Tag,
} from "lucide-react";
import type { ListItemProps } from "./ListItemProps";

export const Items: ListItemProps[] = [
    {
        key: "dashboard",
        href: "dashboard",
        label: "Dashboard",
        className: "listboxItem text-foreground",
        startContent: <House size={20} />,
    },
    {
        key: "inventory",
        label: "Inventory",
        className: "listboxItem text-foreground",
        href: "/inventory/products",
        startContent: <ClipboardList size={20} />,
    },
    {
        key: "reports",
        href: "reports",
        label: "Reports",
        className: "listboxItem text-foreground",
        startContent: <NotebookText size={20} />,
    },
    {
        key: "purchasing",
        href: "purchasing",
        label: "Purchasing",
        className: "listboxItem text-foreground",
        startContent: <Tag size={20} />,
    },
    {
        key: "admin",
        href: "admin",
        label: "Admin",
        className: "listboxItem text-foreground",
        startContent: <SquareUser size={20} />,
    },
    {
        key: "help",
        label: "Help",
        className: "listboxItem text-foreground",
        startContent: <BadgeQuestionMark size={20} />,
        items: [
            {
                key: "faq",
                href: "help/faq",
                label: "FAQ",
                className: "text-foreground px-8",
                isExpanded: false,
            },
        ],
    },
];
