import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography } from '@mui/material'
import CalendarLegends from '../components/CalendarLegends'

export default function Schedule() {
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
            />  
        </Box>
        </>
    )
}
