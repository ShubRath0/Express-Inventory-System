import type React from "react"

interface ScrollContainerProps {
    children: React.ReactNode
}

export const ScrollContainer = ({ children }: ScrollContainerProps) => {
    return (
        <main className="flex-1 overflow-y-auto p-6 pt-2 space-y-6 no-scrollbar">
            {children}
        </main>
    )
}