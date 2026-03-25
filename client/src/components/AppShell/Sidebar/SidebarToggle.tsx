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
        <div className="flex justify-end p-2">
            <button onClick={onToggle}>
                <PanelRightOpen
                    className={`text-blue-50 ${isOpen ? "transform -scale-x-100" : ""}`}
                    size={24}
                />
            </button>
        </div>
    )
}