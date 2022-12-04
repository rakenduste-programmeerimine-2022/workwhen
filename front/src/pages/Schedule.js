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
        { date: "2022-11-01" },
        { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
        .then(function(response){
            setState([])
            // add return snackbar if typeof response.data === "string"
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
                        setState({
                            ...state,
                            events: state.events.push(newEvent)
                        })
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

    const handleEventRender = () => {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography sx={{marginLeft: 0.5}}>{state.events.title}</Typography>
            </Box>
        )
    }

    useEffect(() => {
        getSchedule()
        console.log(state.events)
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
                contentHeight={500}
                events={state.events}
                eventContent={handleEventRender}
            />
        </Box>
        </>
    )
}
