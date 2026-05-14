import { useGetNotifications } from "@/api/__generated__/notification-controller/notification-controller";
import type { NotificationDTO } from "@/api/__generated__/types.schemas";
import { Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import { Bell } from "lucide-react";
import { useState } from "react";

const NotificationDropdown = () => {
  const { data, isLoading } = useGetNotifications();
  const notifications = data?.data ?? [
    {
      id: 1,
      isRead: false,
      message: "Apples are running low on stock",
      type: "LOW_STOCK",
    },
    {
      id: 2,
      isRead: false,
      message: "Purchase order #42 was created",
      type: "PURCHASE_ORDER_CREATED",
    },
    {
      id: 3,
      isRead: true,
      message: "Purchase order #38 has been received",
      type: "PURCHASE_ORDER_RECEIVED",
    },
    {
      id: 4,
      isRead: false,
      message: "Bananas are running low on stock",
      type: "LOW_STOCK",
    },
    {
      id: 5,
      isRead: true,
      message: "50 units of Grapes restocked",
      type: "INVENTORY_USED",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const [readIds, setReadIds] = useState<Set<number>>(new Set());
  const isRead = (n: NotificationDTO) => n.isRead || readIds.has(n.id!);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          startContent={
            <Badge
              content={unreadCount - readIds.size}
              isInvisible={unreadCount - readIds.size === 0}
              color="danger"
              size="sm"
              shape="circle"
            >
              <Bell size={18} />
            </Badge>
          }
        />
      </DropdownTrigger>

      <DropdownMenu className="w-80" emptyContent="No notifications" closeOnSelect={false}>
        <DropdownSection title="Notifications">
          {isLoading
            ? [<DropdownItem key="loading" isReadOnly>
              <span className="text-default-400 text-sm">Loading...</span>
            </DropdownItem>]
            : notifications.map((n) => (
              <DropdownItem
                key={n.id!}
                description={n.type}
                className={isRead(n) ? "bg-default-100 rounded-none" : "rounded-none"}
                onClick={() => setReadIds(prev => new Set(prev).add(n.id!))}
              >
                {n.message}
              </DropdownItem>
            ))
          }
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationDropdown;