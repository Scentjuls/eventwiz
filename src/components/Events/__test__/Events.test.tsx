import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { Events } from "../Events";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing navigation
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get(
    "https://crudcrud.com/api/f0a4d5a62d1041c6924c714da96ab9a3/data/",
    (request, response, context) => {
      // Return mock data
      return response(
        context.status(200),
        context.json([
          {
            _id: "1",
            name: "Event 1",
            availability: true,
            day: "Saturday 18th November",
            description: "Event 1 Description",
            time: "7pm to 11pm",
            location: "Location 1",
          },
          {
            _id: "12",
            name: "Event 12",
            availability: true,
            day: "Sunday 19th November",
            description: "Event 12 Description",
            time: "7pm to 11pm",
            location: "Location 12",
          },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Events", () => {
  it("should render the 'Loading...' message while fetching the data", () => {
    render(<Events />, { wrapper: MemoryRouter });
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("should render a list of events", async () => {
    render(<Events />, { wrapper: MemoryRouter });

    //Wait for events to load
    await waitFor(() => {
      const event1 = screen.getByText("Event 1");
      expect(event1).toBeInTheDocument();
    });

    const event12 = screen.getByText("Event 12");
    expect(event12).toBeInTheDocument();
  });

  it("should render a message when the events array is empty", async () => {
    server.use(
      rest.get(
        "https://crudcrud.com/api/f0a4d5a62d1041c6924c714da96ab9a3/data/",
        (request, response, context) => {
          return response(context.status(200), context.json([]));
        }
      )
    );
    render(<Events />, { wrapper: MemoryRouter });

    // Wait for events to be loaded and then check if there are any messages displayed on page
    await waitFor(() => {
      const noDataMessage = screen.queryByTestId("no-events");
      expect(noDataMessage).not.toBeNull();
    });
  });

  it("should add a new event when the 'Add an Event' button is clicked", async () => {
    // Create a successful Mock request
    //check this post url
    server.use(
      rest.post("http://localhost", (request, response, context) => {
        return response(
          context.status(201),
          context.json({
            _id: "2",
            ...request.json(),
          })
        );
      })
    );

    render(<Events />, { wrapper: MemoryRouter });

    // Find the "Add an Event" button and click it
    const addButtonElement = screen.getByText(/Add an Event/i);
    fireEvent.click(addButtonElement);

    // Fill the form
    const nameInput = screen.getByLabelText("Name");
    const locationInput = screen.getByLabelText("Location");
    const toTimeInput = screen.getByLabelText("To");
    const fromTimeInput = screen.getByLabelText("From");
    const dayInput = screen.getByLabelText("Day");
    const descriptionInput = screen.getByLabelText("Description");
    const availabilityCheckbox = screen.getByLabelText("Availability");

    fireEvent.change(nameInput, { target: { value: "New Event" } });
    fireEvent.change(locationInput, { target: { value: "New Location" } });
    fireEvent.change(fromTimeInput, { target: { value: "12:00" } });
    fireEvent.change(toTimeInput, { target: { value: "16:00" } });
    fireEvent.change(dayInput, { target: { value: "New Day" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.click(availabilityCheckbox);

    // Submit
    const submitButtonElement = screen.getByText("Add");
    fireEvent.click(submitButtonElement);

    // Wait for the new event to be added
    await waitFor(() => {
      const newEvent = screen.getByText("New Event");
      expect(newEvent).toBeInTheDocument();
    });
  });

  it("should delete a specific event when the 'Delete' button is clicked", async () => {
    server.use(
      rest.delete(
        "https://crudcrud.com/api/f0a4d5a62d1041c6924c714da96ab9a3/data/:dataId",
        (request, response, context) => {
          return response(context.status(204));
        }
      )
    );
    render(<Events />, { wrapper: MemoryRouter });

    //Wait for events to load
    await waitFor(() => {
      const event1 = screen.getByText("Event 1");
      expect(event1).toBeInTheDocument();
    });

    // Find the "Delete" button and click it
    const deleteButton = screen.getByTestId("delete-btn-1");
    fireEvent.click(deleteButton);

    // Confirm the deletion
    const confirmDeleteButton = screen.getByRole("button", {
      name: "Delete Event",
    });
    fireEvent.click(confirmDeleteButton);

    // Wait for the event to be removed from the UI
    await waitFor(() => {
      const deletedEvent = screen.queryByText("Event 1");
      expect(deletedEvent).not.toBeInTheDocument();
    });
  });
});
