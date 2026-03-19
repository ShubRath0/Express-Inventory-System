import { NavbarMenu } from "@/components/navbar/navbar";
import SideBar from "./Sidebar/sidebar"

interface PageWrapperProps {
    children: React.ReactNode
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <div className="h-screen bg-background flex overflow-hidden">
            <SideBar />
            <main className="w-full">
                <NavbarMenu />
                {children}
            </main>
        </div>
    )
}