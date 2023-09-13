import { formatAsTime } from "./date-time";

/**
 * Formats the reservation_time property of a single reservation.
 *
 * @param {object} reservation - The reservation object to be formatted.
 * @returns {object} - The reservation with the reservation_time property formatted as HH:MM.
 */
function formatTime(reservation) {
  // Format the reservation_time property using the formatAsTime function from date-time module.
  reservation.reservation_time = formatAsTime(reservation.reservation_time);
  return reservation;
}

/**
 * Formats the reservation_time property of one or more reservations.
 *
 * @param {object|object[]} reservations - A single reservation or an array of reservations.
 * @returns {object|object[]} - The specified reservation(s) with the reservation_time property formatted as HH:MM.
 */
export default function formatReservationTime(reservations) {
  // Check if the input is an array of reservations or a single reservation.
  return Array.isArray(reservations)
    ? reservations.map(formatTime) // If it's an array, format each reservation in the array.
    : formatTime(reservations);    // If it's a single reservation, format it and return.
}
