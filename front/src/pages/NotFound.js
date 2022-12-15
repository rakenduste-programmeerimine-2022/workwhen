import { Box, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

export default function NotFound(){

    return(
        <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "25%"
            }}>
            <Typography>404</Typography>
            <Typography>Page was not found!</Typography>
            <Link to="/dashboard">Back home</Link>
        </Box>
    )
}