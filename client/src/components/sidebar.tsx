import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import {
  House,
  PanelRightOpen,
  ClipboardList,
  NotebookText,
  Tag,
  SquareUser,
  BadgeQuestionMark,
} from "lucide-react";
import logo from "@assets/Express-Logo.svg";
import { useState } from "react";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }
 
  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <aside
      className={`h-screen flex flex-col justify-between bg-blue-950 text-blue-50 ${isSidebarOpen ? "w-10" : "min-w-50"} `}
    >
      <div>
        <header className="py-4 px-2 flex gap-2 items-center">
          <img src={logo} className="w-6" alt="Express Logo" />
          <span className="text-blue-50 text-xl">Express</span>
        </header>
        <Listbox aria-label="Sidebar menu options">
          <ListboxItem key="home" href="/" startContent={<House size={18} />}>
            Home
          </ListboxItem>
          <ListboxItem
            onClick={() => toggleIsExpanded()}
            key="inventory"
            startContent={<ClipboardList size={18} />}
          >
            Inventory
          </ListboxItem>
          {isExpanded ? (
            <ListboxSection>
              <ListboxItem
                key="products"
                href="/inventory/products"
                className="pl-8"
              >
                products
              </ListboxItem>
              <ListboxItem
                key="restock"
                href="/inventory/restock"
                className="pl-8"
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
            startContent={<NotebookText size={18} />}
          >
            Reports
          </ListboxItem>
          <ListboxItem
            key="purchasing"
            href="purchasing"
            startContent={<Tag size={18} />}
          >
            Purchasing
          </ListboxItem>
          <ListboxItem
            key="admin"
            href="admin"
            startContent={<SquareUser size={18} />}
          >
            Admin
          </ListboxItem>
          <ListboxItem
            key="help"
            href="help"
            startContent={<BadgeQuestionMark size={18} />}
          >
            Help
          </ListboxItem>
        </Listbox>
      </div>
      <div className="flex justify-end p-2">
        <button onClick={() => toggleSidebarOpen()}>
          <PanelRightOpen
            className={`text-blue-50 ${isSidebarOpen ? "transform -scale-x-100" : ""}`}
            size={24}
          />
        </button>
      </div>
    </aside>
  );
}
