import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Tables() {
  const history = useHistory(); // Access the history object for navigation.
  const initForm = { table_name: "", capacity: 0 }; // Initial form data.
  const [tableError, setTableError] = useState(null); // State for handling errors.
  const [tableForm, setTableForm] = useState({ ...initForm }); // State for form data.

  function handleFormChange(e) {
    setTableForm({
      ...tableForm,
      [e.target.name]: e.target.value,
    }); // Update form data when input fields change.
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const c = new AbortController();
    try {
      tableForm.capacity = Number(tableForm.capacity); // Convert capacity to a number.
      const response = await createTable(tableForm, c.signal); // Create a new table.
      if (response) {
        history.push("/dashboard"); // Redirect to the dashboard after creating the table.
      }
    } catch (error) {
      setTableError(error); // Handle any errors that occur during table creation.
    }
    return () => c.abort(); // Cleanup the abort controller when unmounting.
  }

  function handleCancel() {
    history.goBack(); // Navigate back to the previous page.
  }

  return (
    <>
      <div className="d-flex justify-content-center pt-3">
        <h3>Create a New Table</h3>
      </div>
      <ErrorAlert error={tableError} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="table_name"
          className="form-control mb-1"
          id="table_name"
          placeholder="Table"
          value={tableForm.table_name}
          onChange={handleFormChange}
          minLength={2}
          required
        />
        <input
          type="number"
          name="capacity"
          className="form-control mb-1"
          id="capacity"
          placeholder="Number of guests"
          value={tableForm.capacity}
          onChange={handleFormChange}
          min="1"
          required
        />
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mr-1">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
