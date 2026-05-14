import { Logo } from '@/assets'

interface SidebarToggleProps {
  isOpen: boolean;
}
export const SidebarHeader = ({ isOpen }: SidebarToggleProps) => {
    return (
        <header className="py-4 px-2 flex gap-2 items-center">
            <img src={Logo} className="w-6" alt="Express Logo" />
            <span className={`text-blue-50 text-[24px] font-medium ${isOpen ? "hidden" : ""}`}>Express</span>
        </header>
    )
}