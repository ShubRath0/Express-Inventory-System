import { SunIcon, MoonIcon } from "lucide-react";
import { Switch } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";

export const ThemeSwitcher = ({ className = "" }) => {
    const { theme, setTheme } = useTheme();

    if (!theme) return null;

    const isDark = theme === "dark";

    return (
        <Switch
            aria-label="Dark Mode"
            endContent={<SunIcon />}
            startContent={<MoonIcon />}
            isSelected={isDark}
            onValueChange={(isDark) => setTheme(isDark ? "dark" : "light")}
            className={className}
        />
    );
};