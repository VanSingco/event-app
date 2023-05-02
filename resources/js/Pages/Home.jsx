import { useState } from "react";
import Calendar from "../Components/Calendar";
import Modal from "../Components/Modal";
import EventForm from "../Components/EventForm";
import { usePage } from "@inertiajs/react";

export default function Home({events, groups}) {
  const [openAddModal, setOpenModal] = useState(false);

  console.log('events', events);

  return (
    <>
      <div className="min-h-full">


        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Event App</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="w-full flex justify-end mb-10">
                <button className="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500" onClick={() => setOpenModal(true)}>Add Event</button>
            </div>
            <Calendar events={events} groups={groups} />
            {/* add event modal */}
            <Modal open={openAddModal} setOpen={setOpenModal}>
              <EventForm type="add" event={null} setOpen={setOpenModal}/>
            </Modal>
          </div>
        </main>
      </div>
    </>
  )
}