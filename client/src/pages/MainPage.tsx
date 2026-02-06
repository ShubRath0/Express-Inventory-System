import { useState } from "react";
import reactLogo from "@assets/react.svg";
import viteLogo from "@assets/vite.svg";
import { Button } from '@heroui/react'

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            {/* Logos */}
            <div className="flex gap-6 mb-6">
                <a
                    href="https://vite.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="will-change-transform"
                >
                    <img
                        src={viteLogo}
                        className="h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] animate-logo-spin"
                        alt="Vite logo"
                    />
                </a>

                <a
                    href="https://react.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="will-change-transform"
                >
                    <img
                        src={reactLogo}
                        className="h-24 p-6 transition-filter duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa]"
                        alt="React logo"
                    />
                </a>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold mb-6">Vite + React</h1>

            {/* Card */}
            <div className="bg-gray-800 p-8 rounded-xl flex flex-col items-center gap-4 mb-6">
                <Button
                    className="relative px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition overflow-hidden"
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </Button>
                <p className="text-gray-400">
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>

            {/* Footer / read-the-docs */}
            <p className="text-gray-500">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
};

export default App;
