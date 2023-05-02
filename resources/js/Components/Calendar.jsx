import React, { useEffect, useState } from 'react'
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import Modal from './Modal';
import EventForm from './EventForm';

export default function Calendar({events, groups}) {

    const [openAddModal, setOpenModal] = useState(false);
    const [activeEvent, setActiveEvent] = useState(null);

    const onEdit = (id) => {
        const event = events.find(item => item.id === id);
        console.log('event', event);
        setActiveEvent({
            id: event.id,
            title: event.event_title,
            description: event.event_description,
            start_date:  event.start_time,
            end_date: event.end_time,
        });
        setOpenModal(true)
    }
    
    return (
        <div>
            <Timeline
                groups={groups}
                items={events.map(item => ({
                    id: item.id,
                    group: groups.find(group => group.title === item.event_title) ? groups.find(group => group.title === item.event_title).id : 0,
                    title: item.title,
                    start_time: moment(item.start_date),
                    end_time: moment(item.end_time)
                }))}
                onItemSelect={onEdit}
                defaultTimeStart={moment().add(-24, 'hour')}
                defaultTimeEnd={moment().add(24, 'hour')}
                lineHeight={100}
                // traditionalZoom={true} -> this does not work :()
                timeSteps={{
                    minute: 5,
                    hour: 1,
                    day: 1,
                    month: 1,
                    year: 1
                }}
                maxZoom={30 * 86400 * 1000}
            />
            <Modal open={openAddModal} setOpen={setOpenModal}>
              <EventForm type="edit" event={activeEvent} setOpen={setOpenModal}/>
            </Modal>
        </div>
    )
}
