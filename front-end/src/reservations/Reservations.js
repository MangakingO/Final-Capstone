import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { isNotOnTuesday } from "../utils/date-time";
import { isInTheFuture } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import Form from "./Form";

export default function Reservations() {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const findErrors = (date, errors) => {
    isNotOnTuesday(date, errors); // Check if the reservation date is not a Tuesday
    isInTheFuture(date, errors); // Check if the reservation date is in the future
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const errors = [];
    findErrors(formData.reservation_date, errors);
    if (errors.length) {
      setReservationsError({ message: errors });
      return;
    }
    try {
      formData.people = Number(formData.people); // Convert the number of people to a number
      await createReservation(formData, controller.signal); // Create the reservation using API
      const date = formData.reservation_date;
      history.push(`/dashboard?date=${date}`); // Redirect to the dashboard with the specified date
    } catch (error) {
      setReservationsError(error); // Set an error if the reservation creation fails
    }
    return () => controller.abort();
  };

  return (
    <>
      <ErrorAlert error={reservationsError} /> {/* Display any reservation errors */}
      <Form
        initialformData={formData}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      /> {/* Render the reservation form */}
    </>
  );
}
