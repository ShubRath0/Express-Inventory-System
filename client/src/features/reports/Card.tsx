import { Card, Link } from "@heroui/react";
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
    icon: <FileDiff color="var(--blue)" />,
    title: "Audit",
    description:
      "Tracks changes made to inventory items, including additions, deletions, and modifications, along with timestamps and user information.",
  },
  {
    icon: <UserCheck color="var(--blue)" />,
    title: "User Activity",
    description:
      "Monitors and reports on user activities within the system, including login attempts, actions performed, and access patterns.",
  },
  {
    icon: <PackageCheck color="var(--blue)" />,
    title: "Purchase Orders",
    description:
      "Generates reports on purchase orders, including order status, supplier information, and order history.",
  },
];

const CardItem = (props: CardProps) => {
  return (
    <Card className="w-full h-full flex items-start gap-4 p-4 hover:scale-[1.02] transition-transform cursor-pointer">
      {props.icon}
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-lg">{props.title}</h3>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </div>
    </Card>
  );
};

export const CardList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 w-260 h-120">
      {CardItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <CardItem
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        </Link>
      ))}
    </div>
  );
};
