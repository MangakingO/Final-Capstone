// Regular expressions for date and time formats
const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

/**
 * Formats a Date object as YYYY-MM-DD.
 *
 * This function is *not* exported because the UI should generally avoid working directly with Date instances.
 * You may export this function if you need it.
 *
 * @param date
 *  an instance of a date object
 * @returns {string}
 *  the specified Date formatted as YYYY-MM-DD
 */
function asDateString(date) {
    // Construct and return the date in YYYY-MM-DD format
    return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
        .toString(10)
        .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

/**
 * Format a date string in ISO-8601 format (which is what is returned from PostgreSQL) as YYYY-MM-DD.
 * @param dateString
 *  ISO-8601 date string
 * @returns {*}
 *  the specified date string formatted as YYYY-MM-DD
 */
export function formatAsDate(dateString) {
    // Extract and return the date part in YYYY-MM-DD format
    return dateString.match(dateFormat)[0];
}

/**
 * Format a time string in HH:MM:SS format (which is what is returned from PostgreSQL) as HH:MM.
 * @param timeString
 *  HH:MM:SS time string
 * @returns {*}
 *  the specified time string formatted as HH:MM.
 */
export function formatAsTime(timeString) {
    // Extract and return the time part in HH:MM format
    return timeString.match(timeFormat)[0];
}

/**
 * Today's date as YYYY-MM-DD.
 * @returns {*}
 *  the today's date formatted as YYYY-MM-DD
 */
export function today() {
    // Get the current date and format it as YYYY-MM-DD
    return asDateString(new Date());
}

/**
 * Subtracts one day from the specified date and returns it in YYYY-MM-DD format.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day prior to currentDate, formatted as YYYY-MM-DD
 */
export function previous(currentDate) {
    // Parse the current date, subtract one day, and format it as YYYY-MM-DD
    let [year, month, day] = currentDate.split("-");
    month -= 1;
    const date = new Date(year, month, day);
    date.setMonth(date.getMonth());
    date.setDate(date.getDate() - 1);
    return asDateString(date);
}

/**
 * Adds one day to the specified date and returns it in YYYY-MM-DD format.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day after currentDate, formatted as YYYY-MM-DD
 */
export function next(currentDate) {
    // Parse the current date, add one day, and format it as YYYY-MM-DD
    let [year, month, day] = currentDate.split("-");
    month -= 1;
    const date = new Date(year, month, day);
    date.setMonth(date.getMonth());
    date.setDate(date.getDate() + 1);
    return asDateString(date);
}

// Time-based validation for creating and updating reservations

/**
 * Validates if a reservation date falls on a Tuesday and adds an error message if true.
 * @param reservation_date
 *  a date string in YYYY-MM-DD format
 * @param errors
 *  an array of error messages
 */
export function isNotOnTuesday(reservation_date, errors) {
    // Parse the date and check if it's a Tuesday, add an error message if true
    const [year, month, day] = reservation_date.split("-");
    const date = new Date(`${month} ${day}, ${year}`);
    if (date.getDay() === 2) {
        errors.push(<li key="tuesday">Restaurant is closed on Tuesdays</li>);
    }
}

/**
 * Validates if a reservation date is in the future (not in the past) and adds an error message if in the past.
 * @param reservation_date
 *  a date string in YYYY-MM-DD format
 * @param errors
 *  an array of error messages
 */
export function isInTheFuture(reservation_date, errors) {
    // Parse the date and compare it with the current date, add an error message if in the past
    const [year, month, day] = reservation_date.split("-");
    const date = new Date(`${month} ${day}, ${year}`);
    const today = new Date();
    if (date < today) {
        errors.push(<li key="past">Reservation must be in the future</li>);
    }
}
