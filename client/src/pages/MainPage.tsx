import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { Button, Divider, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { TOP_PAGES, BOTTOM_PAGES } from "@pages/index";
import type { Page } from "@pages/index";
import { useState } from "react";

const MainPage = () => {
    const [activePage, setActivePage] = useState<Page>(TOP_PAGES[0]);

    return (
        <div className="h-screen flex">

            {/* SIDEBAR */}
            <div className="w-64 border-gray-200 dark:border-gray-900 flex flex-col">

                {/* LOGO SECTION */}
                <div className="h-16 border-gray-200 dark:border-gray-900 flex items-center justify-center">
                    <p className="font-bold text-inherit text-lg">LOGO</p>
                </div>

                {/* SIDEBAR SECTION */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        {TOP_PAGES.map((page: Page) => (
                            <Button
                                key={page.key}
                                variant="flat"
                                radius="none"
                                size="lg"
                                className={`w-full ${activePage.key === page.key ? "bg-gray-200 dark:bg-gray-900" : ""}`}
                                onPress={() => setActivePage(page)}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </div>
                    <div>
                        {BOTTOM_PAGES.map((page: Page) => (
                            <Button
                                key={page.key}
                                variant="flat"
                                radius="none"
                                size="lg"
                                className={`w-full ${activePage.key === page.key ? "bg-gray-200 dark:bg-gray-900" : ""}`}
                                onPress={() => setActivePage(page)}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <Divider orientation="vertical" />

            {/* NAVBAR */}
            <div className="flex-1 flex flex-col overflow-auto">
                {activePage.navbar ? activePage.navbar : (
                    <Navbar position="static" isBordered maxWidth="full">
                        <NavbarContent justify="start">
                            <NavbarBrand>
                                <p className="font-bold text-inherit">Welcome, User</p>
                            </NavbarBrand>
                        </NavbarContent>
                        <NavbarContent justify="end">
                            <ThemeSwitcher />
                        </NavbarContent>
                    </Navbar>
                )}

                {/* MAIN CONTENT */}
                <main className="flex-1 p-4 overflow-auto">
                    {activePage.component}
                </main>
            </div>
        </div>
    )
}

export default MainPage;