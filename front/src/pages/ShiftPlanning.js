import React, { useEffect, useState, useRef, memo } from 'react'
import axios from "axios"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography, Button, Snackbar, Alert, IconButton} from '@mui/material'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import { Container } from '@mui/system'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'



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
    },);
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
    const snackbar = {
        text: "",
        severity: ""
    }

    const [snackOpen, setSnackOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState(snackbar)
    const [state, setState] = useState({
        externalEvents: [
        { title: "Day-Shift", color: "#dbd504", id: 1},
        { title: "Night-Shift", color: "#1604db", id: 2},
        //{ title: "Leave", color: "#0b9e06", id: 3},
        { title: "Booked", color: "#d46402", id: 4}
        ],
        calendarEvents: [],
        calendarSave: []
    });


    const handleEventReceive = (eventInfo) => {
        // console.log(eventInfo.event)
        
        const newEvent = {
            id: eventInfo.event._def.defId,
            title: eventInfo.event.title,
            color: eventInfo.event.backgroundColor,
            date: eventInfo.event.startStr,
        };
        const saveEvent = {
            id: eventInfo.event._def.defId,
            title: eventInfo.event.title,
            date: eventInfo.event.startStr
        }
        eventInfo.revert()
        newEvent.overlap = false

        console.log(eventInfo)
        setState((state) => {
            return {
                ...state,
                calendarSave: state.calendarSave.concat(saveEvent),
                calendarEvents: state.calendarEvents.concat(newEvent)
                
            };
            });
        console.log(state.calendarSave)
    };

    const handleEventDrop = (eventInfo) => {
        console.log(eventInfo.oldEvent)
            const oldEvent ={
                id: eventInfo.oldEvent._def.publicId,
                title: eventInfo.oldEvent.title,
                color: eventInfo.oldEvent.backgroundColor,
                date: eventInfo.oldEvent.startStr
            }
        console.log("moved 1st event (old)")
        console.log(oldEvent)

        
        const newEvent = {
            id: eventInfo.oldEvent._def.publicId,
            title: eventInfo.event.title,
            color: eventInfo.event.backgroundColor,
            date: eventInfo.event.startStr,
        };
        console.log("moved 1st event (new)")
        console.log(newEvent)

        setState((state) => {
            return {
                ...state,
                calendarEvents: state.calendarEvents.map(event => {
                    if (event.id === newEvent.id){
                        event.date = newEvent.date
                        return event
                    } else {
                        return event
                    }
                }),
                calendarSave: state.calendarSave.map(event => {
                    if (event.id === newEvent.id){
                        event.date = newEvent.date
                        return event
                    } else {
                        return event
                    }
                })

            }
            })
            console.log(state.calendarSave)
    };
    
    const handleSnackClose = () => {
        setSnackOpen(false)
    }
    const getData = () => {
        axios.post("http://localhost:8080/shift/get", 
        {
            date: new Date ()
        }, 
        {   
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} 
        })
        .then(function(response){
            console.log(response)    
        })
        .catch(function(err){
            console.log(err)
        })
    }

    useEffect(() => {
        getData()
    },[])

    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:8080/shift/add", {
                shifts: state.calendarSave
            },
            { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
        .then(function(response){
            console.log(response)
            if(typeof response.data === "object" && response.data !== null){
                setSnackOpen(true)
                setSnackbarInfo({
                    text: "Successfully saved!",
                    severity: "success"
                })
            } else if (typeof response.data === "string" && response.data !== null){
                setSnackOpen(true)
                setSnackbarInfo({
                    text: response.data,
                    severity: "info"
                })
            } else {
                setSnackOpen(true)
                setSnackbarInfo({
                    text: "Something went wrong!",
                    severity: "error"
                })
            }
        })
        .catch(function(err){
            console.log(err)
            setSnackOpen(true)
            setSnackbarInfo({
                text: "Something went wrong!",
                severity: "error"
            })
        })
    }

    const handleEventRender = (eventInfo) => {

        const handleEventDelete = () =>{
            console.log("Clicked button (next_line is id)")
            console.log(eventInfo.event.id)
            setState((state) => {
                return {
                    ...state,
                    
                    calendarEvents: state.calendarEvents.filter(event => {
                       return event.id !== eventInfo.event.id                      
                    }),

                    calendarSave: state.calendarEvents.filter(event => {
                        if(event.id !== eventInfo.event.id){
                            return event
                        }                      
                     })
                }
            
        })
        }

        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Typography sx={{marginLeft: 0.5}}>{eventInfo.event.title}</Typography>
              <IconButton sx={{marginLeft: "auto", marginRight: 0.1, padding: 0}} onClick={handleEventDelete}><HighlightOffSharpIcon /></IconButton>
            </Box>
        )

    }

    


    

    


  return (
    <Container sx={{display: "flex"}}>
        <Box sx={{display:"flex", flexDirection:"column" ,marginRight:15, marginTop:20, width: 200, height:170, border:1, padding:1}}>
            <Typography sx={{border:1, borderColor:"grey" , borderRadius: "5px", textAlign:"center", marginBottom:1}}>Shifts: </Typography>
            <Typography>
                {state.externalEvents.map((event) => (
                    <ExternalEvent key={event.id} event={event} />
                ))}
            </Typography>
            <Button  variant="outlined" size="small" sx={{marginTop: 0.5}} onClick={handleSubmit} >Save</Button>
            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
                    {snackbarInfo.text}
                </Alert>
            </Snackbar>
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
                draggable={true}
                droppable={true}
                weekends={state.weekendsVisible}
                events={state.calendarEvents}
                eventContent={handleEventRender}
                eventReceive={handleEventReceive}
                eventDrop={handleEventDrop}
                eventDurationEditable={false}
                contentHeight={500}
                firstDay={1}
            />
        </Box>
    </Container>
  );
}
