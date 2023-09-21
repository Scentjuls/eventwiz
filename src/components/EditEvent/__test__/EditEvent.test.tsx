import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { EditEvent } from "../EditEvent";

const mockUpdateEvent = jest.fn();

const mockProps = {
  name: "Test Event",
  location: "Test Location",
  availability: true,
  time: "4pm to 7pm",
  day: "Monday 22nd September",
  description: "Test Description",
  id: "123",
  updateEvent: mockUpdateEvent,
};

describe("EditEvent", () => {
  it("should render without any errors", () => {
    render(<EditEvent {...mockProps} />);
  });

  it("should open the edit dialog when the 'Edit' button is clicked", () => {
    render(<EditEvent {...mockProps} />);
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    //show edit dialog title
    const editDialogTitle = screen.getByRole("heading", { name: "Edit Event" });
    expect(editDialogTitle).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();
  });

  it("should call the updateEvent function with the correct data when the form is submitted", () => {
    render(<EditEvent {...mockProps} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Updated Test Event" } });

    const submitButton = screen.getByText("Edit an Event");
    fireEvent.click(submitButton);

    expect(mockUpdateEvent).toHaveBeenCalledWith(
      {
        name: "Updated Test Event",
        location: "Test Location",
        availability: true,
        time: "4pm to 7pm",
        day: "Monday 22nd September",
        description: "Test Description",
      },
      "123"
    );
  });

  it("should close the edit dialog when the 'Close' button is clicked", () => {
    render(<EditEvent {...mockProps} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    const editDialogTitle = screen.queryByText("Edit Event");
    expect(editDialogTitle).not.toBeInTheDocument();
  });
});
