import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography, ThemeProvider, Paper } from '@mui/material'
import CalendarLegends from '../components/CalendarLegends'
import globalTheme from '../styles/globalTheme'

export default function Schedule() {
    return(
        <>
        <ThemeProvider theme={globalTheme}>

        <Box sx={{ padding: "2%" }}>
            <CalendarLegends />
        </Box>
        <Paper>
        <Box sx={{ padding: "0 2% 2% 2%", maxWidth: "90%", color: "#2F3E46"}}
                
        >

            <FullCalendar
                
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                firstDay={1}
                contentHeight={500}
            />  
        </Box>
        </Paper>
        </ThemeProvider>
        </>
    )
}
