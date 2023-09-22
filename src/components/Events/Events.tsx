import { useEffect, useState, ReactElement } from "react";
import { AddEvent } from "../AddEvent/AddEvent";
import { AddEventType, EventType } from "../../Types";
import { baseUrl } from "../../Shared";
import { Event } from "../Event/Event";
import { EditEvent } from "../EditEvent/EditEvent";
import { useNavigate } from "react-router-dom";
import { DeleteEvent } from "../DeleteEvent/DeleteEvent";
import { useAlertBar } from "../../Contexts/AlertBarContext";

export const Events = (): ReactElement => {
  const [events, setEvents] = useState<EventType[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { showAlertAvailable } = useAlertBar();

  const addEventHandler = (data: AddEventType): void => {
    const url: string = `${baseUrl}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
        }
        if (!response.ok) {
          throw new Error(`There is a network error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const newState = { ...data };
        setEvents([newState, ...events]);
        showAlertAvailable("success", "A new event has been added");
      })
      .catch((error) => {
        showAlertAvailable("error", error);
        console.log("error from adding: ", error);
      });
  };

  useEffect(() => {
    const url: string = `${baseUrl}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("There is a network error");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handling error and set loading to false
        setLoading(false);
      });
  }, [setEvents]);

  const updateEvent = (data: EventType, id: string): void => {
    const url: string = `${baseUrl}${id}`;
    const updatedData: EventType = { ...data, name: data.name };
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
        }
        if (!response.ok) {
          throw new Error(`There is a network error ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        const eventIndex = events.findIndex((event) => event._id === id);

        if (eventIndex !== -1) {
          const updatedEvents = [...events];
          updatedEvents[eventIndex] = updatedData;
          setEvents(updatedEvents);
        }
        showAlertAvailable("success", "Event has been updated");
      })
      .catch((error) => {
        showAlertAvailable("error", error);
        console.log("error from updating the event: ", error);
      });
  };

  const deleteHandler = (id: string): void => {
    const url: string = `${baseUrl}${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
        }

        if (response.status === 200) {
          return null;
        }

        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }
      })
      .then(() => {
        const updatedEvents = events.filter((event) => event._id !== id);
        setEvents(updatedEvents);
        showAlertAvailable("success", "The event has been deleted");
      })
      .catch((error) => {
        showAlertAvailable("error", error);
        console.log("Error from deleting the event:", error);
      });
  };

  return (
    <div className="max-w-7l min-h-screen p-3">
      <AddEvent newEvent={addEventHandler} />
      <div>
        <div>
          {loading ? ( // Display "Loading" while data is being fetched
            <p className="text-5xl font-bold text-center">Loading...</p>
          ) : events.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {events.map((event: EventType) => {
                const editEvent = (
                  <EditEvent
                    name={event.name}
                    availability={event.availability}
                    day={event.day}
                    description={event.description}
                    time={event.time}
                    location={event.location}
                    id={event._id}
                    updateEvent={updateEvent}
                  />
                );

                const deleteEvent = (
                  <DeleteEvent
                    onDelete={() => deleteHandler(event._id)}
                    id={event._id}
                  />
                );
                return (
                  <Event
                    key={event._id}
                    name={event.name}
                    availability={event.availability}
                    day={event.day}
                    description={event.description}
                    time={event.time}
                    location={event.location}
                    editEvent={editEvent}
                    deleteEvent={deleteEvent}
                  />
                );
              })}
            </div>
          ) : (
            <div data-testid="no-events">There are no events</div>
          )}
        </div>
      </div>
    </div>
  );
};
