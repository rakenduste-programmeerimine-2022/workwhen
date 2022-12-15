import React, { useState } from "react"
import axios from "axios"
import { Button, Typography, Snackbar, Alert } from "@mui/material"


export default function PublishSchedule(date){
    const snackbar = {
        text: "",
        severity: ""
    }
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState(snackbar)

    const handleSnackClose = () => {
        setSnackOpen(false)
    }
    const handlePublish = e => {
        e.preventDefault()
        let publishDate = date.date
        axios.post("http://localhost:8080/shift/publish", 
        { date: publishDate },
        {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(function(response){
            console.log(response)
            if(typeof response.data === "object" && response.data !== null){
                setSnackOpen(true)
                setSnackbarInfo({
                    text: "Successfully published!",
                    severity: "success"
                })
            } else if (typeof response.data === "string" && response.data !== null){
                setSnackOpen(true)
                setSnackbarInfo({
                    text: response.data,
                    severity: "info"
                })
            } else {
                setSnackOpen(true)
                    setSnackbarInfo({
                        text: "Something went wrong!",
                        severity: "error"
                    })
            }
        })
        .catch(function(err){
            console.log(err)
            setSnackOpen(true)
            setSnackbarInfo({
                text: "Something went wrong!",
                severity: "error"
            })
        })
    }
    return(
        <>
            <Typography>! ONLY FOR SCHEDULER !</Typography>
            <Button 
                sx={{color: "#E4C5AF", borderColor: "#E4C5AF"}}
                variant="outlined"
                onClick={handlePublish}
            >
                Publish schedule
            </Button>
            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
                    {snackbarInfo.text}
                </Alert>
            </Snackbar>
        </>
    )
}