import React from "react";
import { render, screen } from "@testing-library/react";
import { Event } from "../Event";

const sampleEventProps = {
  name: "Sample Event",
  location: "Sample Location",
  availability: true,
  time: "4pm to 7pm",
  day: "Monday 19th November",
  description: "This is a sample event description.",
  editEvent: <button>Edit</button>,
  deleteEvent: <button>Delete</button>,
};

describe("Event", () => {
  it("should render the correct event name, day, and time", () => {
    render(<Event {...sampleEventProps} />);

    const eventName = screen.getByText("Sample Event");
    expect(eventName).toBeInTheDocument();

    // Check if the day and time are rendered
    const eventDayTime = screen.getByText("Monday 19th November/4pm to 7pm");
    expect(eventDayTime).toBeInTheDocument();
  });

  it("should show the edit button", () => {
    render(<Event {...sampleEventProps} />);

    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();
  });

  // it("should show the ShowEvent component when the 'Show' button is clicked", () => {
  //   render(<Event {...sampleEventProps} />);

  //   // Check if the ShowEvent component is rendered with the event name
  //   const showEventName = screen.getByText("Sample Event");
  //   expect(showEventName).toBeInTheDocument();

  //   // Check if the ShowEvent component is rendered with the event details
  //   const showEventDetails = screen.getByText(
  //     "Availability: Available Day: Monday Time: 10:00 AM Location: Sample Location Description: This is a sample event description."
  //   );
  //   expect(showEventDetails).toBeInTheDocument();
  // });

  it("should show the delete button", () => {
    render(<Event {...sampleEventProps} />);

    // Check if the delete button is rendered
    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });
});
