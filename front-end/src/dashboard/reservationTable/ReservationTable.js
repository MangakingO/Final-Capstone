import React from "react";
import ReservationRow from "./ReservationRow";
import { cancelReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";

// Component to display a table of reservations.
export default function ReservationTable({
  reservations,
  setReservations,
  setError,
}) {
  const history = useHistory();

  // If there are no reservations, return null (no data to display).
  if (!reservations) {
    return null;
  }

  // Function to handle reservation cancellation.
  async function cancelRes(reservation) {
    try {
      const { status } = await cancelReservation(reservation.reservation_id);

      // Update the reservations array with the updated status.
      const updated = reservations.map((res) => {
        if (res.reservation_id === reservation.reservation_id) {
          res.status = status;
        }
        return res;
      });

      setReservations(updated); // Set the updated reservations.
      history.go(`/dashboard?date=${reservation.reservation_date}`); // Navigate to the dashboard with the same date.
    } catch (error) {
      setError(error);
    }
  }

  // Map the list of reservations to ReservationRow components.
  const formatted = reservations.map((res) => {
    return (
      <ReservationRow
        key={res.reservation_id}
        reservation={res}
        cancelRes={cancelRes}
      />
    );
  });

  return (
    <>
      {/* Render a table to display the list of reservations. */}
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Number</th>
            <th scope="col">Guests</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
            <th scope="col">Seat</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>{formatted}</tbody>
      </table>
    </>
  );
}
