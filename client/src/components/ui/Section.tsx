import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react"

interface SectionProp {
    children?: React.ReactNode,
    size?: size,
    length?: size,
    title?: string,
    className?: string,
}

const sizeClasses = {
    sm: "h-48",
    md: "h-64",
    lg: "h-96"
}

const lengthSizes = {
    sm: "col-span-1",
    md: "col-span-2",
    lg: "col-span-4"
}

type size = "sm" | "md" | "lg"

export const Section = ({ children, size = "sm", length = "sm", title, className }: SectionProp) => {
    return (
        <Card className={`${lengthSizes[length]} ${sizeClasses[size]}`}>
            {title && <CardHeader>{title}</CardHeader>}
            <CardBody className={`${className} flex justify-between`}>
                {children}
            </CardBody>
        </Card>
    )
}