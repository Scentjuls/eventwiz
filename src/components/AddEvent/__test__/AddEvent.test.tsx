import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AddEvent } from "../AddEvent";

const mockNewEvent = jest.fn();

describe("AddEvent", () => {
  it("should render without crashing", () => {
    render(<AddEvent newEvent={mockNewEvent} />);
    const addButtonElement = screen.getByRole("button", {
      name: /Add an Event/i,
    });
    expect(addButtonElement).toBeInTheDocument();
  });

  it("should open the modal when the 'Add an Event' button is clicked", () => {
    render(<AddEvent newEvent={mockNewEvent} />);

    // Find the "Add an Event" button and click it
    const addButtonElement = screen.getByText(/Add an Event/i);
    fireEvent.click(addButtonElement);

    // Check that the dialog is in the document
    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  it("should close the modal when the 'Close' button is clicked", () => {
    render(<AddEvent newEvent={mockNewEvent} />);

    // Find the "Add an Event" button and click it
    const addButtonElement = screen.getByText(/Add an Event/i);
    fireEvent.click(addButtonElement);

    // Find the "Close" button and click it
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Check that the dialog is no longer in the document
    const dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("should call newEvent with the form data when the 'Add' button in the dialog is clicked", () => {
    render(<AddEvent newEvent={mockNewEvent} />);
    // Find the "Add an Event" button and click it
    const addButtonElement = screen.getByText(/Add an Event/i);
    fireEvent.click(addButtonElement);

    // Fill the form
    const nameInput = screen.getByLabelText("Name");
    const locationInput = screen.getByLabelText("Location");
    const timeInput = screen.getByLabelText("Time");
    const dayInput = screen.getByLabelText("Day");
    const descriptionInput = screen.getByLabelText("Description");
    const availabilityCheckbox = screen.getByLabelText("Availability");

    fireEvent.change(nameInput, { target: { value: "Test Event" } });
    fireEvent.change(locationInput, { target: { value: "Test Location" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(dayInput, { target: { value: "Test Day" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.click(availabilityCheckbox);

    // Submit
    const submitButtonElement = screen.getByText("Add");
    fireEvent.click(submitButtonElement);

    //Check if newEvent was called with the right data
    expect(mockNewEvent).toHaveBeenCalledWith({
      name: "Test Event",
      location: "Test Location",
      time: "12:00",
      day: "Test Day",
      description: "Test Description",
      availability: true,
    });
  });
});
