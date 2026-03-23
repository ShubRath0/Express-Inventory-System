import { Logo } from '@/assets'
export const SidebarHeader = () => {
    return (
        <header className="py-4 px-2 flex gap-2 items-center">
            <img src={Logo} className="w-6" alt="Express Logo" />
            <span className="text-blue-50 text-xl">Express</span>
        </header>
    )
}