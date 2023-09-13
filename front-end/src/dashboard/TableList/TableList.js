import React from "react";
import TableInfo from "./TableInfo";

// Component to display a list of tables.
export default function TableList({ tables, loadDashboard }) {
  // If there are no tables, return null (no data to display).
  if (!tables) {
    return null;
  }

  // Map the list of tables to TableInfo components.
  const formatted = tables.map((table) => {
    return (
      <TableInfo key={table.table_id} table={table} loadDashboard={loadDashboard} />
    );
  });

  return (
    <div>
      {/* Render a table to display the list of tables. */}
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>
        <tbody>{formatted}</tbody>
      </table>
    </div>
  );
}
