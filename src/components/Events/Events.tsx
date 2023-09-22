import { useEffect, useState, ReactElement } from "react";
import { AddEvent } from "../AddEvent/AddEvent";
import { AddEventType, EventType } from "../../Types";
import { baseUrl } from "../../Shared";
import { Event } from "../Event/Event";
import { EditEvent } from "../EditEvent/EditEvent";
import { useNavigate } from "react-router-dom";
import { DeleteEvent } from "../DeleteEvent/DeleteEvent";
import { useAlertBar } from "../../Contexts/AlertBarContext";
import { Pagination } from "../Pagination/Pagination";

export const Events = (): ReactElement => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [allEvents, setAllEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(true);

  const navigate = useNavigate();
  const { showAlertAvailable } = useAlertBar();

  const eventsPerPage: number = 10;

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
        console.error("error from adding: ", error);
      });
  };

  const updateEvent = (data: EventType, id: string): void => {
    const url: string = `${baseUrl}${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
          updatedEvents[eventIndex] = data;
          setEvents(updatedEvents);
        }
        showAlertAvailable("success", "Event has been updated");
        setIsUpdateNeeded(true);
      })
      .catch((error) => {
        showAlertAvailable("error", error);
        console.error("error from updating the event: ", error);
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
        setIsUpdateNeeded(true);
      })
      .catch((error) => {
        showAlertAvailable("error", error);
        console.error("Error from deleting the event:", error);
      });
  };

  const totalPages: number = Math.ceil(allEvents.length / eventsPerPage);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isUpdateNeeded) {
      const url: string = `${baseUrl}`;
      fetch(url)
        .then((response) => {
          if (response.status === 404) {
            throw new Error("Not Found");
          }
          if (!response.ok) {
            throw new Error("There is a network error");
          }
          return response.json();
        })
        .then((data) => {
          setAllEvents(data);
          const startIndex: number = (currentPage - 1) * eventsPerPage;
          const endIndex: number = startIndex + eventsPerPage;
          const eventData: EventType[] = data.slice(startIndex, endIndex);
          setEvents(eventData);
          setLoading(false);
          setIsUpdateNeeded(false);
        })
        .catch((error) => {
          if (error.message === "Not Found") {
            navigate("/404");
          } else {
            console.error("Error", error);
            setLoading(false);
          }
        });
    }
  }, [setEvents, navigate, currentPage, isUpdateNeeded]);

  return (
    <div className="max-w-7l min-h-screen p-3">
      <AddEvent newEvent={addEventHandler} />
      <div>
        <div>
          {loading ? ( // Display "Loading..." text while data is being fetched
            <p className="text-5xl font-bold text-center">Loading...</p>
          ) : events.length > 0 ? (
            <>
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
                      key={`edit_${event._id}`}
                    />
                  );

                  const deleteEvent = (
                    <DeleteEvent
                      onDelete={() => deleteHandler(event._id)}
                      id={event._id}
                      key={`delete_${event._id}`}
                    />
                  );
                  return (
                    <Event
                      key={`event_${event._id}`}
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
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div data-testid="no-events">There are no events</div>
          )}
        </div>
      </div>
    </div>
  );
};
