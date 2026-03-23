import { Card, CardBody, Button } from "@heroui/react";
import { ChevronRight, FileText, type LucideIcon } from "lucide-react";

export interface StatCardProps {
    statName: string;
    statValue: number;
    render?: (statValue: number) => React.ReactNode;
    icon?: LucideIcon,
};

export const StatCard = ({
    statName,
    statValue,
    render,
    icon: Icon = FileText
}: StatCardProps) => {
    return (
        <Card shadow="sm" className="h-48 p-2">
            <CardBody className="flex flex-col justify-between h-full">

                {/* Icon and Button */}
                <div className="flex justify-between items-center">
                    <Icon size={20} className="text-foreground" />
                    <Button isIconOnly size="sm" variant="light" radius="full">
                        <ChevronRight size={18} />
                    </Button>
                </div>

                {/* Stat Name and Value */}
                <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-sm font-medium">{statName}</p>
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold">
                            {render ? render(statValue) : `${statValue.toLocaleString()}`}
                        </h3>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};