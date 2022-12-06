import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography } from '@mui/material'
import CalendarLegends from '../components/CalendarLegends'
import { useEffect, useState } from 'react'
import axios from "axios"
/*
        { title: "Day-Shift", color: "#dbd504", id: 1},
        { title: "Night-Shift", color: "#1604db", id: 2},
        { title: "Leave", color: "#0b9e06", id: 3},
        { title: "Booked", color: "#d46402", id: 4}
*/
export default function Schedule() {
    const getSchedule = () => {
        axios.post("http://localhost:8080/shift/schedule",
        { date: "2022-12-01" },
        { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
        .then(function(response){
            // add return snackbar if typeof response.data === "string"
            let eventsFromDB = []
            response.data.forEach(shift => {
                let date = shift.date
                Object.keys(shift).forEach((key) => {
                    if(key !== "date"){
                        let color
                        switch(key){
                            case "dayShift":
                                color = "#dbd504"
                                break
                            case "nightShift":
                                color = "#1604db"
                                break
                            case "booked":
                                color = "#d46402"
                                break
                            case "leave":
                                color = "#0b9e06"
                                break
                        }

                        const newEvent = {
                            date,
                            title: shift[key][0].fullname,
                            color
                        }

                        eventsFromDB.push(newEvent)
                    }
                })
            })
            setState(state => {
                return {
                    ...state,
                    events: []
                }
            })
            eventsFromDB.map(event => {
                return setState(state => {
                    return {
                        ...state,
                        events: state.events.concat(event)
                    }
                })
            })
        })
        .catch(function(error){
            console.log(error)
        })
    }
    const [state, setState] = useState({
        events: []
    })

    const handleEventRender = (eventInfo) => {
        return (
            <Box className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2" style={{
                width: "100%",
                backgroundColor: eventInfo.event.backgroundColor,
                borderColor: eventInfo.event.borderColor,
                color: "white",
                borderRadius: "3px"
            }}>
                <Box className="fc-event-main" style={{
                    width: '100%',
                    height: '25px',
                }}
                sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{marginLeft: 0.5}}>{eventInfo.event.title}</Typography>
                </Box>
            </Box>
        )

    }

    useEffect(() => {
        getSchedule()
        console.log(state)
    }, [])
    return(
        <>
        <Box sx={{ padding: "2%" }}>
            <CalendarLegends />
        </Box>
        <Box sx={{ padding: "0 2% 2% 2%" }}>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                firstDay={1}
                contentHeight={550}
                events={state.events}
                eventContent={handleEventRender}
            />
        </Box>
        </>
    )
}
