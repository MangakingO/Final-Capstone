import React, { useEffect, useState } from "react";
import ReservationTable from "./reservationTable/ReservationTable";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import TableList from "./TableList/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  // Load reservations and tables data when the component mounts or when the date changes.
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    // Fetch reservations and tables data, and update state.
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(listTables)
      .then(setTables)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  // Handler for navigating to today's reservations.
  function handleToday() {
    history.push(`/dashboard`);
  }

  // Handler for navigating to previous day's reservations.
  function handlePrev() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  // Handler for navigating to the next day's reservations.
  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main>
      <h1 className="d-md-flex justify-content-center">Dashboard</h1>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div> 
      <div className="pb-2 d-flex justify-content-center">
        <button className="btn btn-primary mr-1" onClick={handleToday}>
          Today
        </button>
        <button className="btn btn-primary mr-1" onClick={handlePrev}>
          Previous
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationTable
        reservations={reservations}
        setReservations={setReservations}
        setError={setReservationsError}
      />
      <div>
        <TableList tables={tables} loadDashboard={loadDashboard} />
      </div>
    </main>
  );
}

export default Dashboard;
