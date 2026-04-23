import { Button, CardFooter, CardHeader, Spinner } from "@heroui/react";
import { ChevronRight, FileText, type LucideIcon } from "lucide-react";
import { Section } from "./Section";

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
            {statValue == null && <Spinner />}
            {render ? render(statValue) : `${statValue.toLocaleString()}`}
          </h3>
        </div>
      </CardFooter>
    </Section>
  );
};