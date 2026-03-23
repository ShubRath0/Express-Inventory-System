import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { useHref, useNavigate } from "react-router-dom"

interface ProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();

export const Providers = ({ children }: ProviderProps) => {
    const navigate = useNavigate();

    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider navigate={navigate} useHref={useHref}>
                <Toaster position='top-center' reverseOrder={false} />
                {children}

            </HeroUIProvider>
        </QueryClientProvider>
    )
}