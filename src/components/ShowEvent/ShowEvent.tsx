import { useState, Fragment, useRef, ReactElement } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ShowEventProps = {
  name: string;
  location: string;
  availability: boolean;
  time: string;
  day: string;
  description: string;
};

export const ShowEvent = (props: ShowEventProps): ReactElement => {
  const { name, day, time, availability, description, location } = props;
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const cancelButtonRef = useRef(null);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="btn mx-auto block m-2 btn-background-purple hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      >
        Show
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
                  <h2 className="text-base font-extrabold leading-6 text-gray-900 text-3xl pb-3">
                    Event Details
                  </h2>
                  <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                      <p className="pb-3">
                        <span className="font-black">Name:</span>
                        <span className="text-slate-500 font-medium pl-2">
                          {name}
                        </span>
                      </p>
                      <p className="pb-3">
                        <span className="font-black">Day/Time:</span>
                        <span className="text-slate-500 font-medium pl-2">
                          {day}/{time}
                        </span>
                      </p>
                      <p className="pb-3">
                        <span className="font-black">Description:</span>
                        <span className="text-slate-500 font-medium pl-2">
                          {description}
                        </span>
                      </p>
                      <p className="pb-3">
                        <span className="font-black">Availability:</span>
                        <span className="text-slate-500 font-medium pl-2">
                          {availability ? "Yes" : "No"}
                        </span>
                      </p>
                      <p className="pb-3">
                        <span className="font-black">Location:</span>
                        <span className="text-slate-500 font-medium pl-2">
                          {location}
                        </span>
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={handleClose}
                        className="shadow bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        form="eventModal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
