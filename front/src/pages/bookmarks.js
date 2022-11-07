import React, { useEffect, useState } from "react"
import { Box, Divider, Link, Paper, Typography } from '@mui/material'
import axios from "axios"
import BookmarkDialog from "../components/BookmarkDialog"

export default function Bookmarks() {
    const [monitoringArr, setMonitoringArr] = useState([])
    const [mapsArr, setMapsArr] = useState([])

    const getData = () => {
        axios.get("http://localhost:8080/bookmark/all")
        .then(function(response) {
            setMonitoringArr([])
            setMapsArr([])
            response.data.forEach(element => {
                if(element.category === "monitoring"){
                    setMonitoringArr(oldArr => [...oldArr, element])
                }
                if(element.category === "map"){
                    setMapsArr(oldArr => [...oldArr, element])
                }
            })
        })
    }

    useEffect(() => {
        getData()
    }, [])
    
    return (
        <>
        <Box sx={{padding: "0 1rem 0 1rem"}}>
            <Box sx={{display: "flex", alignItems: "center", gap: "1rem"}}>
                <h1>Bookmarks</h1>
                <BookmarkDialog />
            </Box>
            <Paper elevation={7}>
                <Typography variant="h5">Monitooringu tööriistad</Typography>
                <Paper elevation={3} sx={{marginBottom: "2vw"}}>
                    {monitoringArr.map(item => {
                        return(
                            <>
                                <Link
                                    underline="hover"
                                    href={item.link}
                                    target="_blank"
                                >
                                    {item.title}
                                </Link>
                                <br />
                            </>
                            )
                    })}
                </Paper>
                <Divider />
                <Typography variant="h5">Maps</Typography>
                <Paper elevation={3}>
                    {mapsArr.map(item => {
                        return(
                            <>
                                <Link
                                    underline="hover"
                                    href={item.link}
                                    target="_blank"
                                >
                                    {item.title}
                                </Link>
                                <br />
                            </>
                        )
                    })}
                </Paper>
            </Paper>
        </Box>
        </>
    )
}