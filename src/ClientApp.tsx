import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/client/Sidebar";
import { ClientHome } from "./pages/client/ClientHome";
import { Booking } from "./pages/client/Booking";
import { WorkoutSplit } from "./pages/client/WorkoutSplit";
import { Analytics } from "./pages/client/Analytics";
import { Logout } from "./pages/client/Logout";

export function ClientApp() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/client/home" element={<ClientHome />} />
            <Route path="client/booking" element={<Booking />} />
            <Route path="client/analytics" element={<Analytics />} />
            <Route path="client/workouts" element={<WorkoutSplit />} />
            <Route path="client/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
