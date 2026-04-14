import { AppShell } from "@/components";
import { OrvalTest } from "@/components/OrvalTest";
import {
  CreatePurchaseOrderPage,
  DashboardPage,
  InventorySummaryPage,
  Login,
  ProductInventorySection,
  PurchaseOrdersPage,
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
        <Route path="/orval" element={<OrvalTest />}></Route>
        <Route
          path="/inventory/products"
          element={<ProductInventorySection />}
        ></Route>
        <Route path="/reports" element={<Reports />}></Route>
        <Route
          path="/inventory-summary"
          element={<InventorySummaryPage />}
        ></Route>
        <Route path="/purchasing" element={<PurchaseOrdersPage />} />
        <Route path="/purchasing/create" element={<CreatePurchaseOrderPage />} />
        <Route path="/dashboard" element={<DashboardPage />}></Route>
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
