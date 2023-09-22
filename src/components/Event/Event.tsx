import { ReactElement } from "react";
import { ShowEvent } from "../ShowEvent/ShowEvent";
import "./Event.css";

type EventProps = {
  name: string;
  location: string;
  availability: boolean;
  time: string;
  day: string;
  description: string;
  editEvent: ReactElement;
  deleteEvent: ReactElement;
};

export const Event = (props: EventProps): ReactElement => {
  const {
    name,
    day,
    time,
    editEvent,
    availability,
    description,
    location,
    deleteEvent,
  } = props;
  return (
    <div className="m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 event-card">
      <div className="mx-auto text-center space-y-2">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{name}</p>
          <p className="text-slate-500 font-medium">
            {day}/{time}
          </p>
        </div>
        {editEvent}
        <ShowEvent
          name={name}
          availability={availability}
          day={day}
          description={description}
          time={time}
          location={location}
        />
        {deleteEvent}
      </div>
    </div>
  );
};
