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
    Alert,
    MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import axios from "axios"; 
import Select from '@mui/material/Select';

export default function ShiftPlanningDialog({ getData }){
    const [open, setOpen] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)

    const form = {
        employee: "",
        type: "",
        startDate: "",
        endDate: "",
        comments: "",
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
        const newValue = {
            ...formValue,
            ['employee']: JSON.parse(localStorage.getItem("user")).username
        }
        setFormValue(newValue)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSnackClose = () => {
        setSnackOpen(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(formValue.employee && formValue.type && formValue.comments && formValue.startDate && formValue.endDate){
            axios.post("http://localhost:8080/leave/add", {
                employee: formValue.employee,
                type: formValue.type,
                startDate: formValue.startDate,
                endDate: formValue.endDate,
                comments: formValue.comments
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
        if (formValue.type === "" || formValue.startDate === "" || formValue.endDate === ""){
            setSnackOpen(true)
            setSnackbarInfo({
                text: "Form fields are not filled",
                severity: "error"
            })
        }
    }
    return(
        
        <>
            <Button variant="outlined" onClick={handleClickOpen} size="small" sx={{marginBottom:1, borderColor:'white', Width: '100%', padding:'5px', textTransform: "unset", fontSize: 12, color: "white"}}>Planned/Unplanned Leave</Button>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <DialogTitle>Schedule time off</DialogTitle>
                    <DialogContent sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        
                        <InputLabel id="employee-label">Employee:</InputLabel>
                        <TextField 
                            value={JSON.parse(localStorage.getItem("user")).username}
                            onChange={e => handleFormChange(e)}
                            labelId= "employee-label"
                            id="employee"
                            name="employee"
                            inputProps={
                                { readOnly: true, }
                            }
                        />

                        <InputLabel id="leave-type-label">Leave-type:</InputLabel>
                        <Select
                            value={formValue.type }
                            onChange={e => handleFormChange(e)}
                            labelId="leave-type-label"
                            name="type"
                            id="type"
                            >
                            <MenuItem value={"Planned"}>Planned</MenuItem>
                            <MenuItem value={"Unplanned"}>Unplanned</MenuItem>
                        </Select>
  
                        <TextField 
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            value={formValue.startDate}
                            onChange={e => handleFormChange(e)}
                            required
                            id="startDate"
                            label="Select start date"
                            name="startDate"
                        />

                        <TextField 
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            value={formValue.endDate}
                            onChange={e => handleFormChange(e)}
                            required
                            id="endDate"
                            label="Select end date"
                            name="endDate"
                        />

                        <TextField 
                            value={formValue.comments}
                            onChange={e => handleFormChange(e)}
                            id="comments"
                            label="Comments"
                            name="comments"
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
                    
                </Box>
                
            </Dialog>
            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
                    {snackbarInfo.text}
                </Alert>
            </Snackbar>
        </>
    )
    
}