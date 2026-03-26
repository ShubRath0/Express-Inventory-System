import { SunIcon, MoonIcon } from "lucide-react";
import { Switch } from "@heroui/react";
import { useTheme } from "@/hooks/useTheme";

export const ThemeSwitcher = ({ className = "" }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Switch
            aria-label="Dark Mode"
            endContent={<SunIcon />}
            startContent={<MoonIcon />}
            isSelected={isDark}
            onValueChange={toggleTheme}
            className={className}
        />
    );
};