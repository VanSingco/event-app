import React, { useState } from 'react'
import { router } from '@inertiajs/react'

export default function EventForm({type, event, setOpen}) {

    const [title, setTitle] = useState(event ? event.title : '');
    const [description, setDescription] = useState(event ? event.description : '');
    const [start_date, setStartDate] = useState(event ? event.start_date : '');
    const [end_date, setEndDate] = useState(event ? event.end_date : '');
    const [loading, setLoading] = useState(false);

    const onSubmitEvent = (e) => {
        e.preventDefault();
        setLoading(true);

        if (type == 'add') {
            router.post('/events', {
                title,
                description,
                start_date,
                end_date,
            })

            setTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setLoading(false);
            setOpen(false);
        } else if (type !== 'add' && event) {
            router.patch(`/events/${event.id}`, {
                title,
                description,
                start_date,
                end_date,
            })
            setLoading(false);
            setOpen(false);
        }
        
    };

    const onDelete = () => {
        router.delete(`/events/${event.id}`)
        setLoading(false);
        setOpen(false);
    }

    return (
        <div className='p-10'>
            <h1 className='mb-5 text-xl font-bold text-center'>{type == 'add' ? 'Add Event' : 'Event'}</h1>
            <form className="space-y-6" action="#" onSubmit={onSubmitEvent} method="POST">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                    </label>
                    <div className="mt-2">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoComplete="title"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        
                    </div>
                    <div className="mt-2">
                        <textarea value={description} onChange={e => setDescription(e.target.value)} cols="10" rows="5"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    
                    </div>
                </div>

                <div className="grid grid-cols grid-cols-12 gap-5">
                    <div className="col-span-6">
                        <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900">
                            Start Date
                        </label>
                        <div className="mt-2">
                            <input
                                id="start_date"
                                name="start_date"
                                type="datetime-local"
                                value={start_date} 
                                onChange={e => setStartDate(e.target.value)}
                                autoComplete="start_date"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="end_date" className="block text-sm font-medium leading-6 text-gray-900">
                            End Date
                        </label>

                        <div className="mt-2">
                            <input
                                id="end_date"
                                name="end_date"
                                value={end_date} 
                                onChange={e => setEndDate(e.target.value)}
                                type="datetime-local"
                                autoComplete="end_date"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                
                {type == 'add' ? (
                    <div>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        {type == 'add' ? 'Add Event' : 'Save Event'}
                        </button>
                    </div>
                ) : (
                    <div  className="grid grid-cols grid-cols-12 gap-5">
                        <div className='col-span-6'>
                            <button
                                type="button"
                                onClick={onDelete}
                                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Delete
                            </button>
                        </div>
                        <div className='col-span-6'>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update Event
                            </button>
                        </div>
                    </div>
                )}
                
            </form>
        </div>
    )
}
