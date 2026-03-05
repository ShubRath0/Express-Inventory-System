import Sidebar from "@/components/sidebar";
import { NavbarMenu } from "@/components/navbar";
import { useState } from "react";

const App = () => {
    const [content, setContent] = useState<React.ReactNode | null>(null)

    return (
        <div
            className="min-h-screen bg-background flex flex-row"
        >
            <Sidebar setContent={setContent} />
            <main className="flex flex-col w-full">
                <NavbarMenu />
                {content && content}
            </main>
        </div>
    );
};

export default App;