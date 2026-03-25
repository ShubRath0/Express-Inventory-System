interface SectionContainer {
    children?: React.ReactNode,
    size?: size,
}

const sizeClasses = {
    "xs": "grid-cols-3",
    "sm": "grid-cols-4",
    "md": "grid-cols-6",
    "lg": "grid-cols-12"
}

type size = "xs" | "sm" | "md" | "lg"

export const SectionContainer = ({ children, size = "sm" }: SectionContainer) => {
    return (
        <section className={`grid ${sizeClasses[size]} gap-4`}>
            {children}
        </section>
    )
}