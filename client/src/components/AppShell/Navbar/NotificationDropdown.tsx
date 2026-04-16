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
  );
};

export default NotificationDropdown;