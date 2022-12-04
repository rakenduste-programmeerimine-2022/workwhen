import React, { useEffect, useState } from "react"
import { Box, Divider, IconButton, Link, Paper, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from "axios"
import BookmarkDialog from "../components/BookmarkDialog"

export default function Bookmarks() {
    const [monitoringArr, setMonitoringArr] = useState([])
    const [mapsArr, setMapsArr] = useState([])

    const getData = () => {
        axios.get("http://localhost:8080/bookmark/all", { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
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
        .catch(function(err){
            console.log(err)
        })
    }

    const handleDelete = e => {
        console.log(e.currentTarget.id)
        const id = e.currentTarget.id
        axios.post("http://localhost:8080/bookmark/remove", {id}) // where token?
        .then(function(response){
            console.log(response)
            getData()
        })
        .catch(function(error){
            if(error.response){
                console.log(error.response)
            } else if (error.request){
                console.log(error.request)
            } else {
                console.log(error.message)
            }
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
                <BookmarkDialog getData={getData}/>
            </Box>
            <Paper elevation={7} 
                sx={{ 
                maxWidth: "90%",
                backgroundColor: "#E4C5AF",
                overflow: "hidden"  }}
            >
                <Typography variant="h5">Monitooringu tööriistad</Typography>
                <Paper elevation={3}
                    sx={{marginBottom: "2vw"}}>
                    {monitoringArr.map(item => {
                        return(
                            <>
                                <IconButton id={item._id} onClick={e => handleDelete(e)} aria-label="delete" size="small" sx={{marginLeft: "0.5rem"}}>
                                    <DeleteIcon />
                                </IconButton>
                                <Link
                                    underline="hover"
                                    href={item.link}
                                    target="_blank"
                                >
                                    {item.title}
                                </Link>
                                    {item.description ? ` - ${item.description}` : ""}
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
                                <IconButton id={item._id} onClick={e => handleDelete(e)} aria-label="delete" size="small" sx={{marginLeft: "0.5rem"}}>
                                    <DeleteIcon />
                                </IconButton>
                                <Link
                                    underline="hover"
                                    href={item.link}
                                    target="_blank"
                                >
                                    {item.title} 
                                </Link>
                                    {item.description ? ` - ${item.description}` : ""}
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
