import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ShowEvent } from "../ShowEvent";

// Define mock props for testing
const mockProps = {
  name: "Event Name",
  location: "Event Location",
  availability: true,
  time: "4pm to 7pm",
  day: "Monday 13th December",
  description: "Event Description",
};

describe("ShowEvent", () => {
  it("should render the ShowEvent component", () => {
    render(<ShowEvent {...mockProps} />);
    expect(screen.getByText("Show")).toBeInTheDocument();
  });

  it("should open the modal when the Show button is clicked", () => {
    render(<ShowEvent {...mockProps} />);
    fireEvent.click(screen.getByText("Show"));

    expect(screen.getByText("Event Details")).toBeInTheDocument();
    expect(screen.getByText("Event Name")).toBeInTheDocument();
    expect(
      screen.getByText("Monday 13th December/4pm to 7pm")
    ).toBeInTheDocument();
    expect(screen.getByText("Event Description")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("Event Location")).toBeInTheDocument();
  });

  it("should close the modal when the Close button is clicked", () => {
    render(<ShowEvent {...mockProps} />);
    fireEvent.click(screen.getByText("Show"));
    expect(screen.getByText("Event Details")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Event Details")).not.toBeInTheDocument();
  });
});
