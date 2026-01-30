// Backend-ready: later swap internals with fetch() to Laravel
// status = upcoming|past (for tab filter)
// approvalStatus = pending|accepted|declined (admin decision)

const mockAppointments = [
  {
    id: 1,
    status: "upcoming",
    approvalStatus: "pending",
    mode: "online",
    meetingLink: null,
    location: null,
    date: "Feb 21, 2026",
    time: "11:00 AM",
    project: "Random Building",
    purpose: "Contract",
  },
  {
    id: 2,
    status: "upcoming",
    approvalStatus: "accepted",
    mode: "f2f",
    meetingLink: null,
    location: null, // admin hasn't set yet
    date: "Feb 28, 2026",
    time: "11:00 AM",
    project: "Random Building",
    purpose: "Documents",
  },
  {
    id: 3,
    status: "past",
    approvalStatus: "accepted",
    mode: "online",
    meetingLink: "https://meet.google.com/xxx-xxxx-xxx",
    location: null,
    date: "Jan 29, 2026",
    time: "11:00 AM",
    project: "Random Building",
    purpose: "Planning",
  },
  {
    id: 4,
    status: "upcoming",
    approvalStatus: "pending",
    mode: "f2f",
    meetingLink: null,
    location: null,
    date: "Mar 03, 2026",
    time: "09:30 AM",
    project: "Laguna Warehouse",
    purpose: "Consultation",
  },
  {
    id: 5,
    status: "upcoming",
    approvalStatus: "accepted",
    mode: "online",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    location: null,
    date: "Mar 05, 2026",
    time: "02:00 PM",
    project: "Cavite Townhouse",
    purpose: "Planning",
  },
  {
    id: 6,
    status: "upcoming",
    approvalStatus: "declined",
    mode: "online",
    meetingLink: null,
    location: null,
    date: "Mar 06, 2026",
    time: "10:00 AM",
    project: "Office Renovation",
    purpose: "Documents",
  },
  {
    id: 7,
    status: "upcoming",
    approvalStatus: "accepted",
    mode: "f2f",
    meetingLink: null,
    location: "Main Office, Laguna",
    date: "Mar 08, 2026",
    time: "01:00 PM",
    project: "Retail Fit-out",
    purpose: "Consultation",
  },
  {
    id: 8,
    status: "upcoming",
    approvalStatus: "pending",
    mode: "online",
    meetingLink: null,
    location: null,
    date: "Mar 10, 2026",
    time: "04:30 PM",
    project: "Subdivision Gate",
    purpose: "Contract",
  },
  {
    id: 9,
    status: "upcoming",
    approvalStatus: "accepted",
    mode: "online",
    meetingLink: null, // accepted but link not set yet
    location: null,
    date: "Mar 12, 2026",
    time: "11:15 AM",
    project: "Solar Canopy",
    purpose: "Planning",
  },
  {
    id: 10,
    status: "upcoming",
    approvalStatus: "pending",
    mode: "f2f",
    meetingLink: null,
    location: null,
    date: "Mar 15, 2026",
    time: "03:00 PM",
    project: "Parking Expansion",
    purpose: "Consultation",
  },
  {
    id: 11,
    status: "upcoming",
    approvalStatus: "accepted",
    mode: "f2f",
    meetingLink: null,
    location: null, // to be provided
    date: "Mar 18, 2026",
    time: "09:00 AM",
    project: "School Annex",
    purpose: "Documents",
  },
  {
    id: 12,
    status: "upcoming",
    approvalStatus: "accepted",
    mode: "online",
    meetingLink: "https://zoom.us/j/1234567890",
    location: null,
    date: "Mar 20, 2026",
    time: "05:00 PM",
    project: "Bridge Inspection",
    purpose: "Consultation",
  },
  {
    id: 13,
    status: "past",
    approvalStatus: "accepted",
    mode: "f2f",
    meetingLink: null,
    location: "Site Office, Cavite",
    date: "Jan 10, 2026",
    time: "10:30 AM",
    project: "Drainage Upgrade",
    purpose: "Planning",
  },
  {
    id: 14,
    status: "past",
    approvalStatus: "declined",
    mode: "f2f",
    meetingLink: null,
    location: null,
    date: "Jan 12, 2026",
    time: "02:15 PM",
    project: "Mall Expansion",
    purpose: "Contract",
  },
  {
    id: 15,
    status: "past",
    approvalStatus: "accepted",
    mode: "online",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/xxx",
    location: null,
    date: "Jan 14, 2026",
    time: "01:45 PM",
    project: "Clinic Renovation",
    purpose: "Documents",
  },
  {
    id: 16,
    status: "past",
    approvalStatus: "pending",
    mode: "online",
    meetingLink: null,
    location: null,
    date: "Jan 16, 2026",
    time: "09:15 AM",
    project: "Condo Punchlist",
    purpose: "Consultation",
  },
  {
    id: 17,
    status: "past",
    approvalStatus: "accepted",
    mode: "f2f",
    meetingLink: null,
    location: "Client HQ, Makati",
    date: "Jan 18, 2026",
    time: "04:00 PM",
    project: "Facade Repair",
    purpose: "Planning",
  },
  {
    id: 18,
    status: "past",
    approvalStatus: "accepted",
    mode: "online",
    meetingLink: null, // accepted but not provided
    location: null,
    date: "Jan 20, 2026",
    time: "11:00 AM",
    project: "Road Widening",
    purpose: "Consultation",
  },
  {
    id: 19,
    status: "past",
    approvalStatus: "declined",
    mode: "online",
    meetingLink: null,
    location: null,
    date: "Jan 22, 2026",
    time: "03:30 PM",
    project: "Waterproofing",
    purpose: "Contract",
  },
  {
    id: 20,
    status: "past",
    approvalStatus: "accepted",
    mode: "f2f",
    meetingLink: null,
    location: null, // to be provided (even if past, just mock)
    date: "Jan 25, 2026",
    time: "08:30 AM",
    project: "Warehouse Mezzanine",
    purpose: "Documents",
  },
];

export async function listAppointments({
  status = "upcoming",
  page = 1,
  limit = 10,
} = {}) {
  await new Promise((r) => setTimeout(r, 120)); // simulate network

  let data = mockAppointments.filter((a) => a.status === status);

  // Optional: make past show latest first
  if (status === "past") data = [...data].reverse();

  const totalPages = Math.max(1, Math.ceil(data.length / limit));
  const start = (page - 1) * limit;

  return { data: data.slice(start, start + limit), page, totalPages };
}

export async function createAppointment(payload) {
  await new Promise((r) => setTimeout(r, 120));

  const created = {
    id: Date.now(),
    status: payload.status ?? "upcoming", // tab bucket
    approvalStatus: payload.approvalStatus ?? "pending",
    mode: payload.mode ?? "online",
    meetingLink: payload.meetingLink ?? null,
    location: payload.location ?? null,
    date: payload.date,
    time: payload.time,
    project: payload.project,
    purpose: payload.purpose,
    // optional user fields (kept for backend-ready)
    name: payload.name ?? "",
    email: payload.email ?? "",
    phone: payload.phone ?? "",
    details: payload.details ?? "",
  };

  mockAppointments.unshift(created);
  return created;
}
