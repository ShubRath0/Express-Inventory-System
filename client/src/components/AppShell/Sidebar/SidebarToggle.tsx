import { PanelRightOpen } from "lucide-react"

interface SidebarToggleProps {
    isOpen: boolean,
    onToggle: () => void
}

export const SidebarToggle = ({
    isOpen,
    onToggle
}: SidebarToggleProps) => {
    return (
      <div
        className={`flex p-2 ${isOpen ? "justify-center bg-oklch(0.34 0.05 266.42) borderRadius-md" : "justify-end"}`}
      >
        <button onClick={onToggle}>
          <PanelRightOpen
            className={`text-blue-50 ${isOpen ? "transform -scale-x-100 " : ""}`}
            size={24}
          />
        </button>
      </div>
    );
}