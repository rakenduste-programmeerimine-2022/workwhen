import React, { useEffect, useState, useRef, memo } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography } from '@mui/material'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import { Container } from '@mui/system'


const ExternalEvent = memo(({ event }) => {
    let elRef = useRef(null);
    useEffect(() => {
        let draggable = new Draggable(elRef.current, {
        eventData: function () {
            return { ...event, create: true };
            
        }
        });
    //Removes duplicates
    return () => draggable.destroy();
    
    });
    return (
        <Box
            ref={elRef}
            className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
            style={{
                backgroundColor: event.color,
                borderColor: event.color,
                cursor: "pointer"
            }}
        >
            <Box className="fc-event-main">
                <Typography sx={{textAlign: "center"}}>{event.title}</Typography>
            </Box>
        </Box>
    );
    });

export default function ShiftPlanning() {
  const [state, setState] = useState({
    externalEvents: [
      { title: "Day-Shift", color: "#dbd504", id: 1 },
      { title: "Night-Shift", color: "#1604db", id: 2 },
      { title: "Vacation", color: "#0b9e06", id: 3 },
      { title: "Booked", color: "#d46402", id: 4 }
    ],
    calendarEvents: []
  });


  const handleEventReceive = (eventInfo) => {
    const newEvent = {
      id: eventInfo.draggedEl.getAttribute("data-id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("data-color"),
      start: eventInfo.date,
      end: eventInfo.date,
    };

    setState((state) => {
        return {
            ...state,
            calendarEvents: state.calendarEvents.concat(newEvent)
        };
        });
  };

  return (
    <Container sx={{display: "flex"}}>
        <Box sx={{marginRight:15, marginTop:20, width: 200, height:135, border:1, padding:1}}>
            <Typography sx={{border:1, borderColor:"grey" , borderRadius: "5px", textAlign:"center", marginBottom:1}}>Shifts: </Typography>
            <Typography>
            {state.externalEvents.map((event) => (
                <ExternalEvent key={event.id} event={event} />
            ))}
            </Typography>
        </Box>
        <Box sx={{width: 1000, marginLeft: "auto"}}>
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
                right: "today prev,next",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={state.weekendsVisible}
            events={state.calendarEvents}
            droppable={true}
            eventReceive={handleEventReceive}
            contentHeight={500}
            
            />
        </Box>
    </Container>
  );
}
