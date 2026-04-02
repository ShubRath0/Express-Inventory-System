import { AppShell } from "@/components";
import {
  DashboardPage,
  Login,
  ProductInventorySection,
  Reports,
} from "@/features";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Every single route inside of this will have an "AppShell" (Sidebar + Navbar) */}
      {/* Anything outside of the route will NOT have an AppShell (login / anything else) */}
      <Route element={<AppShell />}>
        <Route path="/" element={<></>}></Route>
        <Route
          path="/inventory/products"
          element={<ProductInventorySection />}
        ></Route>
        <Route path="/reports" element={<Reports />}></Route>
        <Route path="inventory-summary"></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/purchasing"></Route>
        <Route path="/admin"></Route>
        <Route path="/help"></Route>
        <Route path="/notifications"></Route>
        <Route path="/user"></Route>
        <Route path="settings"></Route>
      </Route>
      <Route path="signin" element={<Login />}></Route>
    </Routes>
  );
};
