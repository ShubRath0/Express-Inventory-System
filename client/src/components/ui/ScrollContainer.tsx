

export const ScrollContainer = ({ children, ...props }: any) => {
    return (
        <main className="flex-1 overflow-y-auto p-6 pt-2 space-y-6 no-scrollbar" {...props}>
            {children}
        </main>
    )
}