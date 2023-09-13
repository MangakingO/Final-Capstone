import { formatAsDate } from "./date-time";

/**
 * Formats the reservation_date property of a single reservation.
 *
 * @param {object} reservation - The reservation object to be formatted.
 * @returns {object} - The reservation with the reservation_date property formatted as YYYY-MM-DD.
 */
function formatDate(reservation) {
  // Format the reservation_date property using the formatAsDate function from date-time module.
  reservation.reservation_date = formatAsDate(reservation.reservation_date);
  return reservation;
}

/**
 * Formats the reservation_date property of one or more reservations.
 *
 * @param {object|object[]} reservations - A single reservation or an array of reservations.
 * @returns {object|object[]} - The specified reservation(s) with the reservation_date property formatted as YYYY-MM-DD.
 */
export default function formatReservationDate(reservations) {
  // Check if the input is an array of reservations or a single reservation.
  return Array.isArray(reservations)
    ? reservations.map(formatDate) // If it's an array, format each reservation in the array.
    : formatDate(reservations);    // If it's a single reservation, format it and return.
}
