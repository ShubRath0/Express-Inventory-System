import { BrowserRouter } from "react-router-dom"

interface TopProviders {
    children: React.ReactNode
}

export const TopProviders = ({ children }: TopProviders) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}