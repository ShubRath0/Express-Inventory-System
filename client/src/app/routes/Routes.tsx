import { AppShell } from "@/components"
import { InventoryProviders } from "@/features/products/context/InventoryProviders"
import { Signin } from "@/features/Login/Login";
import { ProductInventorySection } from "@/features/products/InventoryProductPage"
import { Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
    return (
      <Routes>
        {/* Every single route inside of this will have an "AppShell" (Sidebar + Navbar) */}
        {/* Anything outside of the route will NOT have an AppShell (login / anything else) */}
        <Route element={<AppShell />}>
          <Route path="/" element={<></>}></Route>

          {/* Wrapped this route in a provider to prevent MASS prop drilling (ANNOYING) */}
          <Route element={<InventoryProviders />}>
            <Route
              path="/inventory/products"
              element={<ProductInventorySection />}
            ></Route>
          </Route>

          <Route path="/inventory/restock"></Route>
          <Route path="/reports"></Route>
          <Route path="/dashboard"></Route>
          <Route path="/purchasing"></Route>
          <Route path="/admin"></Route>
          <Route path="/help"></Route>
          <Route path="/help/faq"></Route>
          <Route path="/notifications"></Route>
          <Route path="/user"></Route>
          <Route path="settings"></Route>
        </Route>
        <Route path="signin" element={<Signin />}></Route>
      </Routes>
    );
}