import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Items } from "./Items";
import type { ListItemProps } from "./ListItemProps";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarToggle } from "./SidebarToggle";

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
          variant="solid"
          color="primary"
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
                color="primary"
              >
                {subItem.label}
              </ListboxItem>
            ))}
        </>
      </ListboxSection>
    );
  }

  return (
    <motion.aside
      initial={{ width: 200 }}
      animate={{ width: isSidebarOpen ? 50 : 200 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-sidebar flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <SidebarHeader isOpen={isSidebarOpen} />

        {/* Main Content */}
        <Listbox aria-label="Sidebar menu options">
          {Items.map(renderItem)}
        </Listbox>
      </div>

      {/* Toggle */}
      <SidebarToggle isOpen={isSidebarOpen} onToggle={toggleSidebarOpen} />
    </motion.aside>
  );
};
