import {
    House,
    ClipboardList,
    NotebookText,
    Tag,
    SquareUser,
    BadgeQuestionMark,
} from "lucide-react";
import type { ListItemProps } from "./ListItemProps";

export const Items: ListItemProps[] = [
    {
        key: "dashboard",
        href: "dashboard",
        label: "Dashboard",
        className: "listboxItem text-foreground",
        startContent: <House size={18} />,
    },
    {
        key: "inventory",
        label: "Inventory",
        className: "listboxItem text-foreground",
        startContent: <ClipboardList size={18} />,
        items: [
            {
                key: "products",
                href: "inventory/products",
                label: "Products",
                className: "text-foreground px-8",
                isExpanded: false,
            },
            {
                key: "restock",
                href: "inventory/restock",
                label: "Restock",
                className: "text-foreground px-8",
                isExpanded: false,
            },
        ],
    },
    {
        key: "reports",
        href: "reports",
        label: "Reports",
        className: "listboxItem text-foreground",
        startContent: <NotebookText size={18} />,
    },
    {
        key: "purchasing",
        href: "purchasing",
        label: "Purchasing",
        className: "listboxItem text-foreground",
        startContent: <Tag size={18} />,
    },
    {
        key: "admin",
        href: "admin",
        label: "Admin",
        className: "listboxItem text-foreground",
        startContent: <SquareUser size={18} />,
    },
    {
        key: "help",
        label: "Help",
        className: "listboxItem text-foreground",
        startContent: <BadgeQuestionMark size={18} />,
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
