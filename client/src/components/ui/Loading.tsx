import { Spinner } from "@heroui/react"

export type LoadingProps = {
    label?: string
}

export const Loading = ({
    label
}: LoadingProps) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Spinner label={label} size="lg" />
        </div >
    )
}