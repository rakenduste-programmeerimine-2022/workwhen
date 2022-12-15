import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography, ThemeProvider, Paper, Snackbar, Alert } from '@mui/material'
import CalendarLegends from '../components/CalendarLegends'
import { useEffect, useState } from 'react'
import axios from "axios"
import globalTheme from '../styles/globalTheme'

export default function Schedule() {
    const [state, setState] = useState({
        events: []
    })
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState({
        text: "",
        severity: ""
    })

    const handleSnackClose = () => {
        setSnackOpen(false)
    }
    
    const getSchedule = (date) => {
        axios.post("http://localhost:8080/shift/schedule",
        { date },
        { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
        .then(function(response){
            if(typeof response.data === "string"){
                setSnackOpen(true)
                return setSnackbarInfo({
                    text: response.data,
                    severity: "info"
                })
            }
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

                        shift[key].forEach(type => {
                            const newEvent = {
                                date,
                                title: type.fullname,
                                color
                            }
                            eventsFromDB.push(newEvent)
                        })
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
            setSnackOpen(true)
            setSnackbarInfo({
                text: "Something went wrong!",
                severity: "error"
            })
        })
    }

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
        getSchedule(new Date())
    }, [])

    return(
        <>
        <ThemeProvider theme={globalTheme}>
            <Box sx={{ padding: "2%", marginLeft: "3%" }}>
                <CalendarLegends />
            </Box>
            <Paper sx={{ marginTop: 0} }>
                <Box sx={{ padding: "1% 2% 2% 2%", maxWidth: "90%", color: "#2F3E46"}}>
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        firstDay={1}
                        contentHeight={550}
                        events={state.events}
                        eventContent={handleEventRender}
                        datesSet={arg => getSchedule(arg.startStr)}
                        showNonCurrentDates={false}
                    />
                </Box>
            </Paper>
            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
                    {snackbarInfo.text}
                </Alert>
            </Snackbar>
        </ThemeProvider>
        </>
    )
}
