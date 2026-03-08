import { Card, CardBody } from "@heroui/react"
import type React from "react"

type StatCardProps = {
    statName: string
    statValue: number
    render?: (statValue: number) => React.ReactNode
}

export const StatCard = ({ statName, statValue, render }: StatCardProps) => {

    return (
        <Card radius="none" className="h-16">
            <CardBody className="h-full flex flex-col justify-center px-4 py-2">
                <p className="text-xl font-semibold leading-none">
                    {render ? render(statValue) : statValue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">{statName}</p>
            </CardBody>
        </Card>
    )
}