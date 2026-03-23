import { AppNavbar } from "@/components/AppShell/Navbar";
import { Sidebar } from "./Sidebar"
import { Outlet } from "react-router-dom";

export const AppShell = () => {
    return (
        <div className="h-screen bg-background flex overflow-hidden">
            <Sidebar />
            <main className="w-full">
                <AppNavbar />

                {/* This will render whatever the element={} of the current route in Routes.tsx*/}
                <Outlet />

            </main>
        </div>
    )
}