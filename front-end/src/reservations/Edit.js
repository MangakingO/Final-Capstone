import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { isNotOnTuesday, isInTheFuture } from "../utils/date-time";
import { findReservation, modifyReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Form from "./Form";

export default function Edit() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [error, setError] = useState(null);
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    // Function to load reservation data
    async function loadReservation() {
      const ac = new AbortController();
      try {
        // Fetch reservation data by reservation_id
        const reservation = await findReservation(reservation_id, ac.signal);
        setReservationData(reservation);
      } catch (error) {
        setError(error);
      }
      return () => ac.abort(); // Cleanup function to cancel fetch if component unmounts
    }

    loadReservation(); // Trigger the loading of reservation data when the component mounts
  }, [reservation_id]); // Dependency array ensures this effect runs when reservation_id changes

  // Function to find validation errors
  const findErrors = (res, errors) => {
    isNotOnTuesday(res.reservation_date, errors);
    isInTheFuture(res.reservation_date, errors);
    // In-line validation to ensure reservation can be modified
    if (res.status && res.status !== "booked") {
      errors.push(
        <li key="not booked">Reservation can no longer be changed</li>
      );
    }
  };

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const ac = new AbortController();
    const errors = [];
    findErrors(reservationData, errors);

    if (errors.length) {
      setError({ message: errors });
      return;
    }

    try {
      reservationData.people = Number(reservationData.people);
      await modifyReservation(reservation_id, reservationData, ac.signal);
      history.push(`/dashboard?date=${reservationData.reservation_date}`);
    } catch (error) {
      setError(error);
    }
    return () => ac.abort(); // Cleanup function to cancel API request if component unmounts
  }

  // Function to handle form input changes
  const handleFormChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <ErrorAlert error={error} />
      <Form
        initialformData={reservationData}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
