<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

type NotificationItem = {
  id: number;
  message: string;
  type: string;
  read: boolean;
};

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/notifications")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return res.json();
      })
      .then((data) => {
        console.log("notifications from backend:", data);
        setNotifications(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load notifications:", err);
        setNotifications([]);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "22px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-10px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              padding: "2px 6px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "36px",
            right: 0,
            width: "320px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              padding: "12px",
              borderBottom: "1px solid #eee",
              fontWeight: 600,
            }}
          >
            Notifications
          </div>

          {notifications.length === 0 ? (
            <div style={{ padding: "12px" }}>No recent notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #f1f1f1",
                  background: notification.read ? "#fff" : "#f9fafb",
                }}
              >
                <div style={{ fontWeight: 500 }}>{notification.message}</div>
                <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                  {notification.type}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
=======
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
>>>>>>> master
  );
};

export default NotificationDropdown;