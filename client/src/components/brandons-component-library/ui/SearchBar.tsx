import { Input } from "@heroui/react"
import { Search } from "lucide-react"

export type SearchBarProps = {
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export const SearchBar = (
    {
        onChange,
        placeholder,
        className
    }: SearchBarProps) => {
    return (
        <Input
            variant="flat"
            radius="none"
            color="default"
            label={placeholder}
            className={className}
            onChange={(e) => onChange(e.target.value)}
            startContent={<Search size={18} className="text-default-400" />}
            isClearable
            onClear={() => onChange("")}
        />
    )
}