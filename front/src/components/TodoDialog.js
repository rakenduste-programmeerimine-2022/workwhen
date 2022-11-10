import React, { useState } from 'react';
import { 
    Button,
    Dialog, 
    DialogActions,
    DialogContent, 
    DialogTitle, 
    TextField, 
    Box,
    Snackbar, 
    Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"; 

export default function BookmarkDialog({getData}){
    const [open, setOpen] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)

    const form = {
        title: "",
        description: "",
        date: "",
        assigned: ""
    }

    const snackbar = {
        text: "",
        severity: ""
    }

    const [formValue, setFormValue] = useState(form)
    const [snackbarInfo, setSnackbarInfo] = useState(snackbar)

    const handleFormChange = e => {
        const { value, name } = e.target
        const newValue = {
            ...formValue,
            [name]: value
        }
        setFormValue(newValue)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSnackClose = () => {
        setSnackOpen(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(formValue.title && formValue.description && formValue.date && formValue.assigned){
            axios.post("http://localhost:8080/todo/add", {
                title: formValue.title,
                description: formValue.description,
                date: formValue.date,
                assigned: formValue.assigned
            },
            { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
            .then(function(response){
                console.log(response)
                if(typeof response.data === "object" && response.data !== null){
                    setSnackOpen(true)
                    setSnackbarInfo({
                        text: "Successfully saved!",
                        severity: "success"
                    })
                    setOpen(false)
                    getData()
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
                setOpen(false)
            })
        }
        if (formValue.title === "" || formValue.description === "" || formValue.assigned === "" || formValue.date === ""){
            setSnackOpen(true)
            setSnackbarInfo({
                text: "Form fields are not filled",
                severity: "error"
            })
        }
    }
    
    return(
        
        <>
            <Button variant="outlined" onClick={handleClickOpen} size="small" sx={{margin:1, color:'black', borderColor:'black', maxWidth: '36px', padding:'5px'}}><AddIcon></AddIcon></Button>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <DialogTitle>Add a new to-do assignment</DialogTitle>
                    <DialogContent sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        <TextField 
                            value={formValue.title}
                            onChange={e => handleFormChange(e)}
                            required
                            id="title"
                            label="Title"
                            name="title"
                        />
                        <TextField 
                            value={formValue.description}
                            onChange={e => handleFormChange(e)}
                            required
                            id="description"
                            label="Assignment description"
                            name="description"    
                        />
                       
                        <TextField 
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            value={formValue.date}
                            onChange={e => handleFormChange(e)}
                            required
                            id="date"
                            label="Select due date"
                            name="date"

                        />
                    
                        <TextField
                            value={formValue.assigned}
                            onChange={e => handleFormChange(e)}
                            required
                            id="assigned"
                            label="Assign a person"
                            name="assigned"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={handleClose}
                            size="normal"
                            variant="contained"
                            margin="normal"
                            >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            size="normal"
                            variant="contained"
                            margin="normal"
                            >
                            Save
                        </Button>
                    </DialogActions>
                    <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
                            {snackbarInfo.text}
                        </Alert>
                    </Snackbar>
                </Box>
            </Dialog>
        </>
    )
    
}