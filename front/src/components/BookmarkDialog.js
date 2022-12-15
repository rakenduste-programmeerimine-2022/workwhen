import React, { useState } from "react";
import { 
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    FormHelperText, 
    TextField, 
    Box, 
    Snackbar, 
    Alert 
} from "@mui/material";
import axios from "axios";

export default function BookmarkDialog({ getData }){
    const [open, setOpen] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    
    const form = {
        category: "",
        title: "",
        description: "",
        link: ""
    }
    const snackbar = {
        text: "",
        severity: "info"
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
        if(formValue.category && formValue.title && formValue.link){
            axios.post("http://localhost:8080/bookmark/add", {
                category: formValue.category,
                title: formValue.title,
                description: formValue.description,
                link: formValue.link
            },
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
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
    }

    return(
        <>
        <Button sx={{color: "#E4C5AF", borderColor: "#E4C5AF"}} variant="outlined" onClick={handleClickOpen} data-testid="addButton">Add</Button>
        <Dialog open={open} onClose={handleClose}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <DialogTitle>Add a new bookmark</DialogTitle>
                <DialogContent sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <TextField 
                        value={formValue.category}
                        onChange={e => handleFormChange(e)}
                        required
                        id="category"
                        label="Category"
                        name="category"
                    />
                    <FormHelperText>Type "monitoring" or "map"</FormHelperText>
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
                        id="description"
                        label="Description"
                        name="description"
                    />
                    <TextField
                        value={formValue.link}
                        onChange={e => handleFormChange(e)}
                        required
                        id="link"
                        label="Link to resource"
                        name="link"
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose}
                        size="normal"
                        variant="contained"
                        margin="normal"
                        sx={{backgroundColor: "#2F3E46"}} 
                        >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        size="normal"
                        variant="contained"
                        margin="normal"
                        sx={{backgroundColor: "#2F3E46"}} 
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