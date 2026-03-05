import { Accordion, AccordionItem, Button, Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import {
  House,
  PanelRightOpen,
  ClipboardList,
  NotebookText,
  Tag,
  SquareUser,
  BadgeQuestionMark,
  Apple,
} from "lucide-react";
import logo from "@assets/Express-Logo.svg";
import { useState } from "react";
import { InventorySection } from "@/sections/ProduceInventorySection";

interface SidebarProps {
  // This allows the child to send JSX back up to the parent
  setContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
}

export default function SideBar({ setContent }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
    setIsSidebarOpen(false);
  };

  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsExpanded(false)
  };

  return (
    <aside
      className={`bg-sidebar flex flex-col justify-between text-sidebar-foreground transition-all duration-300 ${isSidebarOpen ? "w-10" : "w-50"} `}
    >
      <div>
        <header className="py-4 px-2 flex gap-2 items-center">
          <img src={logo} className="w-6" alt="Express Logo" />
          <span className="text-blue-50 text-xl">Express</span>
        </header>
        <Listbox aria-label="Sidebar menu options">
          <ListboxItem
            key="home"
            href="/"
            className="listboxItem"
            startContent={<House size={18} />}
          >
            Home
          </ListboxItem>
          <ListboxItem
            key="inventory"
            className="listboxItem"
            startContent={<ClipboardList size={18} />}
            onClick={toggleIsExpanded}
          >
            Inventory
          </ListboxItem>
          {isExpanded ? (
            <ListboxSection>
              <ListboxItem
                key="products"
                // href="/inventory/products"
                onPress={() => setContent(<InventorySection />)}
                className="px-8"
              >
                products
              </ListboxItem>
              <ListboxItem
                key="restock"
                href="/inventory/restock"
                className="px-8"
              >
                restock
              </ListboxItem>
            </ListboxSection>
          ) : (
            <></>
          )}
          <ListboxItem
            key="reports"
            href="/reports"
            className="listboxItem"
            startContent={<NotebookText size={18} />}
          >
            Reports
          </ListboxItem>
          <ListboxItem
            key="purchasing"
            href="purchasing"
            className="listboxItem"
            startContent={<Tag size={18} />}
          >
            Purchasing
          </ListboxItem>
          <ListboxItem
            key="admin"
            href="admin"
            className="listboxItem"
            startContent={<SquareUser size={18} />}
          >
            Admin
          </ListboxItem>
          <ListboxItem
            key="help"
            href="help"
            className="listboxItem"
            startContent={<BadgeQuestionMark size={18} />}
          >
            Help
          </ListboxItem>
        </Listbox>
      </div>
      <div className="flex justify-end p-2">
        <button onClick={() => toggleSidebarOpen()}>
          <PanelRightOpen
            className={`text-blue-50 transition-transform duration-300 ${isSidebarOpen ? "transform -scale-x-100" : ""}`}
            size={24}
          />
        </button>
      </div>
    </aside>
  );
}
