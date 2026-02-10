// ClientAssign.jsx
import Select from "react-select";
import { Field } from "../adminProjectsUi";

export default function ClientAssign({
  draft,
  loading,
  filteredClients = [],
  applyClient,
}) {
  const options = filteredClients.map((c) => ({
    value: c.id,
    label: c.name,
    email: c.email,
  }));

  return (
    <div className="ap-block">
      <h3 className="ap-h3">Assign client</h3>

      <Field label="Client">
        <Select
          classNamePrefix="appt-select"
          options={options}
          isLoading={loading}
          placeholder="Search client by name or email…"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          maxMenuHeight={240}
          onChange={(opt) => {
            if (opt) applyClient(opt.value);
          }}
          getOptionLabel={(opt) =>
            `${opt.label}${opt.email ? ` (${opt.email})` : ""}`
          }
        />
      </Field>

      {draft.clientEmail && (
        <div className="ap-clientAssigned">
          <span className="ap-clientAssigned__label">Assigned</span>
          <span className="ap-clientAssigned__email">{draft.clientEmail}</span>
        </div>
      )}
    </div>
  );
}
