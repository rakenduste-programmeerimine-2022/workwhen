import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Typography } from '@mui/material'

export default function Schedule() {
    return(
        <>
        <Box sx={{ padding: "2%" }}>
            <Typography variant="h4">Legend icons here</Typography>
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
