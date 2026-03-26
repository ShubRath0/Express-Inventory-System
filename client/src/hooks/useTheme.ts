import { ThemeContext } from "@/app/context/ThemeProvider"
import React from "react";

export const useTheme = () => {
    const context = React.useContext(ThemeContext)
    if (!context) throw new Error("usetheme must be used within a ThemeProvider")
    return context;
}