import React, { useState, useRef, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import dayjs from 'dayjs';

function TrainingCalendar() {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
    }

    useEffect(() => {
        fetchTrainings();
    }, [])

    return (
        <div style={{ width: '90%', marginLeft: '1%' }}>
            <FullCalendar
                locale={'fi'}
                height={600}
                headerToolbar={{
                    start: "today prev next",
                    center: "title",
                    end: "dayGridMonth dayGridWeek dayGridDay listWeek"
                }}
                plugins={[dayGridPlugin, listPlugin]}
                views={
                    ["dayGridMonth", "dayGridWeek", "dayGridDay", "listWeek"]
                }
                initialView="dayGridMonth"
                firstDay={1}
                events={trainings}
                eventDataTransform={function (event) {
                    event.title = event.activity + ' / ' + event.customer.firstname + ' ' + event.customer.lastname;
                    event.start = event.date;
                    event.end = dayjs(event.date).add(event.duration, 'minutes').toISOString();
                    return event;
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                eventDisplay={'block'}
                eventColor={'#1769aa'}
                displayEventEnd={true}
            />
        </div>
    )
}

export default TrainingCalendar;