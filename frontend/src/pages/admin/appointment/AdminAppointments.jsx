import "./admin-appointments.css";
import { useAdminAppointments } from "./useAdminAppointments";
import AppointmentsList from "./AppointmentsList";
import AppointmentDetails from "./AppointmentDetails";

export default function AdminAppointments() {
  const s = useAdminAppointments();

  const from = s.total === 0 ? 0 : (s.page - 1) * s.pageSize + 1;
  const to = Math.min(s.total, s.page * s.pageSize);

  return (
    <div className="aa">
      <header className="aa-header">
        <div>
          <h1 className="aa-title">Manage Appointments</h1>
          <p className="aa-sub">
            Approve, reject, reschedule, cancel, and assign meeting details.
          </p>
        </div>
      </header>

      <main className="aa-grid">
        <AppointmentsList {...s} from={from} to={to} />

        <AppointmentDetails {...s} />
      </main>
    </div>
  );
}
