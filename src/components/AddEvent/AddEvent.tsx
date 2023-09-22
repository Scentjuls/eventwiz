import { useState, Fragment, useRef, ReactElement } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AddEventType } from "../../Types";
import moment from "moment";
import "./AddEvent.css";

type AddEventProps = {
  newEvent: (data: AddEventType) => void;
};

export const AddEvent = (props: AddEventProps): ReactElement => {
  const { newEvent } = props;
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [availability, setAvailability] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const cancelButtonRef = useRef(null);
  const handleShow = () => setShow(true);

  const toggleAvailability = (): void => {
    setAvailability(!availability);
  };

  function convertTime(time24: string): string {
    const [hours, minutes] = time24.split(":");
    let period = "AM";

    // Convert the hours to an integer
    let hoursInt = parseInt(hours);

    // Determining either AM or PM
    if (hoursInt >= 12) {
      period = "PM";
      if (hoursInt > 12) {
        hoursInt -= 12;
      }
    }

    // Create the 12-hour formatted time string
    const time12 = `${hoursInt}:${minutes} ${period}`;

    return time12;
  }

  const handleSubmit = (): void => {
    // Parse the date input value in "yyyy-MM-dd" format
    const dateParts: string[] = day.split("-");
    const year = Number(dateParts[0]);
    const month = Number(dateParts[1]);
    const dayOfMonth = Number(dateParts[2]);

    // Create a new Date object with the parsed date parts
    const date = new Date(year, month - 1, dayOfMonth);

    // Format the date using moment
    const formattedDate: string = moment(date).format("dddd Do MMMM");

    // Format the time string
    const formattedTime: string = `${convertTime(fromTime)} to ${convertTime(
      toTime
    )}`;

    newEvent({
      name,
      location,
      time: formattedTime,
      day: formattedDate,
      description,
      availability,
    });
    setName("");
    setLocation("");
    setFromTime("");
    setToTime("");
    setDay("");
    setDescription("");
    setAvailability(false);
    setShow(false);
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="mx-auto block m-2 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        Add an Event
      </button>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="p-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <h3 className="text-base font-extrabold leading-6 text-gray-900 text-3xl pb-5">
                    Add Event
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    id="eventModal"
                    className="w-full max-w-sm"
                  >
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="name"
                        >
                          Name
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="name"
                          placeholder="John Smith"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="location"
                        >
                          Location
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="location"
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="fromTime"
                        >
                          From
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="fromTime"
                          type="time"
                          value={fromTime}
                          onChange={(e) => setFromTime(e.target.value)}
                          required
                        />
                      </div>
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="toTime"
                        >
                          To
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="toTime"
                          type="time"
                          value={toTime}
                          onChange={(e) => setToTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="day"
                        >
                          Day
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="day"
                          type="date"
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="description"
                        >
                          Description
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <textarea
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="description"
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="availability"
                        >
                          Availability
                        </label>
                      </div>
                      <div className="md:w-2/3 check-box">
                        <input
                          className=""
                          id="availability"
                          type="checkbox"
                          checked={availability}
                          onChange={toggleAvailability}
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={handleClose}
                        className="shadow bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                      >
                        Close
                      </button>
                      <button
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-4"
                        form="eventModal"
                        type="submit"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
