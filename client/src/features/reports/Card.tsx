import { GenericCard } from "@/components/Generic/GenericCard";
import { Button, Link } from "@heroui/react";
import { FileDiff, Layers2, PackageCheck, UserCheck } from "lucide-react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const CardItems: CardProps[] = [
  {
    icon: <Layers2 color="var(--blue)" />,
    title: "Inventory Summary",
    description:
      "Provides an overview of current inventory levels, including total stock, low stock items, and out-of-stock products.",
    href: "/inventory-summary",
  },
  {
    icon: <FileDiff className="text-green-500" />,
    title: "Audit",
    description:
      "Tracks changes made to inventory items, including additions, deletions, and modifications, along with timestamps and user information.",
  },
  {
    icon: <UserCheck className="text-yellow-500" />,
    title: "User Activity",
    description:
      "Monitors and reports on user activities within the system, including login attempts, actions performed, and access patterns.",
  },
  {
    icon: <PackageCheck className="text-purple-500" />,
    title: "Purchase Orders",
    description:
      "Generates reports on purchase orders, including order status, supplier information, and order history.",
  },
];

export const ReportsList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full h-120" aria-label="Reports List">
      {CardItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <GenericCard 
            className="h-full hover:scale-105 transition-transform duration-300"
            header={<div className="flex flex-col gap-3 justify-center">{item.icon}<span className="font-semibold">{item.title}</span></div>}
            body={
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            }
            footer={<Button color="primary" size="sm" radius="full">View</Button>}
          />
        </Link>
      ))}
    </div>
  );
};
