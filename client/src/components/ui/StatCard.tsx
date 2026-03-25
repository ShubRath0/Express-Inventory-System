import { Button, CardHeader, CardFooter } from "@heroui/react";
import { ChevronRight, FileText, type LucideIcon } from "lucide-react";
import { Section } from "./Section";
import { motion } from 'framer-motion'

export interface StatCardProps {
    statName: string;
    statValue: number;
    render?: (statValue: number) => React.ReactNode;
    index?: number,
    icon?: LucideIcon,
};

export const StatCard = ({
    statName,
    statValue,
    render,
    index = 0,
    icon: Icon = FileText
}: StatCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: index * 0.1 }}
        >
            <Section>
                {/* Icon and Button */}
                <CardHeader className="flex justify-between items-center">
                    <div className="rounded-xl bg-icon text-foreground p-2">
                        <Icon size={20} />
                    </div>
                    <Button isIconOnly size="sm" variant="light" radius="full">
                        <ChevronRight size={18} />
                    </Button>
                </CardHeader>

                {/* Stat Name and Value */}
                <CardFooter className="flex-col items-start">
                    <p className="text-gray-500 text-sm font-medium">{statName}</p>
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold">
                            {render ? render(statValue) : `${statValue.toLocaleString()}`}
                        </h3>
                    </div>
                </CardFooter>
            </Section>
        </motion.div>

    );
};