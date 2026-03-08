import { PanelRightOpen } from "lucide-react";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { Items } from "@/components/sidebar/Items";
import logo from "@assets/Express-Logo.svg";
import { useState } from "react";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState<string | null>(null);

  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleIsExpanded = (key: string) => {
    setIsExpanded((prev) => (prev === key ? null : key));
  };

  return (
    <aside
      className={`bg-sidebar flex flex-col justify-between ${isSidebarOpen ? "w-10" : "min-w-50"} `}
    >
      <div>
        <header className="py-4 px-2 flex gap-2 items-center">
          <img src={logo} className="w-6" alt="Express Logo" />
          <span className="text-blue-50 text-xl">Express</span>
        </header>
        <Listbox aria-label="Sidebar menu options">
          {Items.map((item) => (
            <ListboxSection key={item.key}>
              <ListboxItem
                key={item.key}
                href={item.href}
                className={item.className}
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
                      className={subItem.className}
                    >
                      {subItem.label}
                    </ListboxItem>
                  ))}
              </>
            </ListboxSection>
          ))}
        </Listbox>
      </div>
      <div className="flex justify-end p-2">
        <button onClick={toggleSidebarOpen}>
          <PanelRightOpen
            className={`text-blue-50 ${isSidebarOpen ? "transform -scale-x-100" : ""}`}
            size={24}
          />
        </button>
      </div>
    </aside>
  );
}
