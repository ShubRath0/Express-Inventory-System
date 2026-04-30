import { useEffect, useState } from "react";

type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
type Status = "OPEN" | "IN_PROGRESS" | "PENDING" | "RESOLVED" | "CLOSED";

type Ticket = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt?: string;
};

const API = "http://localhost:8080/tickets";

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "LOW" as Priority,
  });

  async function loadTickets() {
    const res = await fetch(API);
    const data = await res.json();
    setTickets(Array.isArray(data) ? data : data.data ?? []);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  async function createTicket() {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", description: "", priority: "LOW" });
    setShowModal(false);
    loadTickets();
  }

  async function updateStatus(id: number, status: Status) {
    await fetch(`${API}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    loadTickets();
  }

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2>Support Tickets</h2>
          <p>View and manage IT support requests</p>
        </div>

        <button onClick={() => setShowModal(true)}>+ New Ticket</button>
      </div>

      <table style={{ width: "100%", marginTop: "24px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>PRIORITY</th>
            <th>STATUS</th>
            <th>CREATED AT</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.priority}</td>
              <td>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    updateStatus(ticket.id, e.target.value as Status)
                  }
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="PENDING">PENDING</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </td>
              <td>
                {ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleDateString()
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              width: "420px",
              borderRadius: "12px",
            }}
          >
            <h3>Create new ticket</h3>

            <input
              placeholder="Brief description of the issue"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ width: "100%", marginBottom: "12px" }}
            />

            <textarea
              placeholder="Please describe the issue in detail"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={{ width: "100%", height: "120px", marginBottom: "12px" }}
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value as Priority })
              }
              style={{ width: "100%", marginBottom: "12px" }}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="URGENT">URGENT</option>
            </select>

            <button onClick={createTicket}>Submit Ticket</button>
            <button onClick={() => setShowModal(false)} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}