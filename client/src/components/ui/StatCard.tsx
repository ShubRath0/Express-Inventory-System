import { Button, CardFooter, CardHeader, Spinner } from "@heroui/react";
import { ChevronRight, FileText, type LucideIcon } from "lucide-react";
import { Section } from "./Section";

export interface StatCardProps {
  statName: string;
  statValue: number;
  render?: (statValue: number) => React.ReactNode;
  icon?: LucideIcon,
  className?: string
};

export const StatCard = ({
  statName,
  statValue,
  render,
  icon: Icon = FileText,
  className
}: StatCardProps) => {
  return (
    <Section>
      {/* Icon and Button */}
      <CardHeader className="flex justify-between items-center">
        <div className={className}>
          <Icon size={24} />
        </div>
        <Button isIconOnly size="sm" variant="light" radius="full">
          <ChevronRight size={18} />
        </Button>
      </CardHeader>

      {/* Stat Name and Value */}
      <CardFooter className="flex-col items-start">
        <p className="text-gray-500 text-sm font-normal">{statName}</p>
        <div className="flex items-center gap-2">
          <h3 className="text-4xl font-bold">
            {statValue == null && <Spinner />}
            {render ? render(statValue) : `${statValue.toLocaleString()}`}
          </h3>
        </div>
      </CardFooter>
    </Section>
  );
};