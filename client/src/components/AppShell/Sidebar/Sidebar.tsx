import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { Items } from "./Items";
import { useState } from "react";
import type { ListItemProps } from "./ListItemProps";
import { SidebarToggle } from "./SidebarToggle";
import { SidebarHeader } from "./SidebarHeader";

export const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState<string | null>(null);

    const toggleSidebarOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleIsExpanded = (key: string) => {
        setIsExpanded((prev) => (prev === key ? null : key));
    };

    function renderItem(item: ListItemProps) {
        return (
            <ListboxSection key={item.key}>
                <ListboxItem
                    key={item.key}
                    href={item.href}
                    className={`${item.className} text-sidebar-foreground`}
                    startContent={item.startContent}
                    onClick={() => toggleIsExpanded(item.key)}
                    textValue={item.label}
                >
                    {item.label}
                </ListboxItem>
                <>
                    {isExpanded === item.key &&
                        item.items?.map((subItem) => (
                            <ListboxItem
                                key={subItem.key}
                                href={subItem.href}
                                className={`${subItem.className} text-sidebar-foreground`}
                            >
                                {subItem.label}
                            </ListboxItem>
                        ))}
                </>
            </ListboxSection>
        )
    }

    return (
        <aside className={`bg-sidebar flex flex-col justify-between ${isSidebarOpen ? "w-10" : "min-w-50"} `}>
            <div>
                {/* Header */}
                <SidebarHeader />

                {/* Main Content */}
                <Listbox aria-label="Sidebar menu options">
                    {Items.map(renderItem)}
                </Listbox>
            </div>

            {/* Toggle */}
            <SidebarToggle isOpen={isSidebarOpen} onToggle={toggleSidebarOpen} />
        </aside>
    );
}
