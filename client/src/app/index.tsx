import { Routes, Route } from "react-router-dom";
import Tickets from "../features/Tickets/Tickets";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/tickets" element={<Tickets />} />
    </Routes>
  );
};