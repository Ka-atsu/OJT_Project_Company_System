import Select from "react-select";
import { Field } from "../adminProjectsUi";

export default function ClientAssign({
  draft,
  loading,
  applyClient,
  filteredClients, // Passed from the parent component (filtered based on search)
  setClientQuery, // Ensure setClientQuery is passed down from the parent or manage it here
}) {
  // Create options array based on filteredClients data
  const options = filteredClients.slice(0, 7).map((c) => ({
    value: c.id,
    label: `${c.name}`, // Display only name in the label
    email: c.email, // Storing email separately in case needed
  }));

  return (
    <div className="ap-block">
      <h3 className="ap-h3">Assign client</h3>

      <Field label="Client">
        <Select
          classNamePrefix="appt-select"
          options={options} // Use options created from filteredClients
          isLoading={loading}
          placeholder="Search client by name or email…"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          maxMenuHeight={240}
          onInputChange={(inputValue) => {
            console.log("Search Input Value:", inputValue); // Log input value for debugging
            setClientQuery(inputValue); // Update clientQuery state based on user input
          }}
          onChange={(opt) => {
            if (opt) {
              applyClient(opt.value); // Apply client selection by its value
              setClientQuery(opt.label); // Update clientQuery to the selected client's name
            }
          }}
          getOptionLabel={(opt) => `${opt.label}`} // Label for each option
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
