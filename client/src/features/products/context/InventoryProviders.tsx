import { Outlet } from "react-router-dom"
import { FilterProvider } from "./FilterProvider"
import { ModalProvider } from "./ModalProvider"
import { ProductProvider } from "./ProductProvider"
import { StatProvider } from "./StatProvider"

export const InventoryProviders = ({ children }: { children?: React.ReactNode }) => {
    return (
        <ProductProvider>
            <ModalProvider>
                <FilterProvider>
                    <StatProvider>
                        {children ? children : <Outlet />}
                    </StatProvider>
                </FilterProvider>
            </ModalProvider>
        </ProductProvider>
    )
}