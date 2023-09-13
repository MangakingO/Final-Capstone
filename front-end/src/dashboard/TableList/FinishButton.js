import React from "react";
import { useHistory } from "react-router";
import { unassignTable } from "../../utils/api";

// Component for finishing a table.
export default function FinishButton({ status, table, loadDashboard }) {
  const history = useHistory();

  // Handle the button click event.
  async function handleClick() {
    return window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
      ? await handleFinish(table.table_id, table.reservation_id)
      : null;
  }

  // Perform the finish action.
  async function handleFinish(table_id, reservation_id) {
    await unassignTable(table_id, reservation_id); // Unassign the table.
    await loadDashboard(); // Reload the dashboard data.
    history.push("/dashboard"); // Navigate back to the dashboard.
  }

  // Render the button when the table is occupied.
  return (
    status === "Occupied" && (
      <td>
        <button
          data-table-id-finish={table.table_id}
          type="button"
          onClick={handleClick}
          className="btn btn-sm btn-primary"
        >
          Finish
        </button>
      </td>
    )
  );
}
