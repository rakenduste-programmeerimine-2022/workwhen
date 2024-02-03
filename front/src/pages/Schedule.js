import { CalendarApi } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { Box, Typography, ThemeProvider, Paper, Snackbar, Alert } from '@mui/material'
import CalendarLegends from '../components/CalendarLegends'
import { useEffect, useState } from 'react'
import axios from "axios"


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

    return (
        <>
          <Box sx={{ padding: "2%", marginLeft: "3%" }}>
            <CalendarLegends />
          </Box>
          <Paper sx={{ marginTop: 0 }}>
            <Box sx={{ padding: "1% 2% 2% 2%", maxWidth: "90%" }}>
              <CalendarApi
                plugins={[dayGridPlugin, googleCalendarPlugin]} // Include the Google Calendar plugin
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth'
                }}
                events={state.events} // Your events data
                eventContent={handleEventRender} // Your event rendering function
                // googleCalendarApiKey="YOUR_GOOGLE_API_KEY" // Replace with your Google API Key
                // events={{ googleCalendarId: 'YOUR_GOOGLE_CALENDAR_ID' }} // Replace with your Google Calendar ID
              />
            </Box>
          </Paper>
          <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
              {snackbarInfo.text}
            </Alert>
          </Snackbar>
        </>
      );
    }