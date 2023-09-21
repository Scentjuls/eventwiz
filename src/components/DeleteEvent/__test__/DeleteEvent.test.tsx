import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteEvent } from "../DeleteEvent";

// Mock the onDelete function
const mockDelete = jest.fn();

const eventId = "event123";

describe("DeleteEvent", () => {
  it("should render the Delete button", () => {
    render(<DeleteEvent onDelete={mockDelete} id={eventId} />);
    const deleteButton = screen.getByTestId(`delete-btn-${eventId}`);
    expect(deleteButton).toBeInTheDocument();
  });

  it("should open the confirmation dialog when the Delete button is clicked", () => {
    render(<DeleteEvent onDelete={mockDelete} id={eventId} />);

    const deleteButton = screen.getByTestId(`delete-btn-${eventId}`);
    fireEvent.click(deleteButton);

    // Assert that the confirmation dialog is displayed
    const confirmationDialog = screen.getByRole("heading", {
      name: "Delete Event",
    });
    expect(confirmationDialog).toBeInTheDocument();
  });

  it("should call the onDelete function once when the Delete Event button in the dialog is clicked", () => {
    render(<DeleteEvent onDelete={mockDelete} id={eventId} />);

    const deleteButton = screen.getByTestId(`delete-btn-${eventId}`);
    fireEvent.click(deleteButton);

    const deleteEventButton = screen.getByRole("button", {
      name: "Delete Event",
    });
    fireEvent.click(deleteEventButton);

    expect(mockDelete).toHaveBeenCalled();
  });

  it("should close the dialog when the Cancel button in the dialog is clicked", () => {
    render(<DeleteEvent onDelete={mockDelete} id={eventId} />);

    const deleteButton = screen.getByTestId(`delete-btn-${eventId}`);
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    const confirmationDialog = screen.queryByText("Delete Event");
    expect(confirmationDialog).not.toBeInTheDocument();
  });
});
