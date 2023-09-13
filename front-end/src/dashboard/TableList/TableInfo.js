import React from "react";
import FinishButton from "./FinishButton";

// Component to display information about a table.
export default function TableInfo({ table, loadDashboard }) {
  // Determine the status of the table based on reservation_id.
  const status = table.reservation_id ? "Occupied" : "Free";

  return (
    <>
      <tr>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>{status}</td>

        {/* Render the FinishButton component for finishing an occupied table. */}
        <FinishButton
          status={status}
          table={table}
          loadDashboard={loadDashboard}
        />
      </tr>
    </>
  );
}
