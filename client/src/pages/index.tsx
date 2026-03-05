// pages.tsx
import React from "react"
import { InventoryPage as InvPage } from "@/sections/ProduceInventorySection"
import { InventoryNavbar } from "@/components/navbars/InventoryNavbar"
import { InventorySubmissionPage } from "./InventorySubmissionPage"
import { RequestNavbar } from "@/components/navbars/RequestNavbar"

export interface Page {
    key: string
    label: string
    component: React.ReactNode
    navbar: React.ReactNode | null
}

// Dummy page components
const HomePage = <div className="text-xl">Home Page (placeholder)</div>
const InventoryPage = <InvPage />
const ReportsPage = <div className="text-xl">Reports Page (placeholder)</div>
const AdminPage = <div className="text-xl">Admin Page (placeholder)</div>
const NotificationsPage = <div className="text-xl">Notifications Page (placeholder)</div>
const HelpPage = <div className="text-xl"> Help Page (placeholder)</div>
const SettingsPage = <div className="text-xl">Settings Page (placeholder)</div>

export const TOP_PAGES: Page[] = [
    { key: "Home", label: "Home", component: HomePage, navbar: null },
    { key: "Inventory", label: "Inventory", component: InventoryPage, navbar: < InventoryNavbar /> },
    { key: "Reports", label: "Reports", component: ReportsPage, navbar: null },
    { key: "Requests", label: "Requests", component: <InventorySubmissionPage />, navbar: <RequestNavbar /> },
]

export const BOTTOM_PAGES: Page[] = [
    { key: "Admin", label: "Admin", component: AdminPage, navbar: null },
    { key: "Notifications", label: "Notifications", component: NotificationsPage, navbar: null },
    { key: "Help", label: "Help", component: HelpPage, navbar: null },
    { key: "Settings", label: "Settings", component: SettingsPage, navbar: null },
]