import React, { useState } from 'react';
import { 
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    FormHelperText, 
    TextField, 
    Box } from '@mui/material';
    import AddIcon from '@mui/icons-material/Add';
    import axios from "axios"; 

    export default function BookmarkDialog({getData}){
        const [open, setOpen] = useState(false)

        const form = {
            title: "",
            description: "",
            date: "",
            assigned: ""
        }

        const [formValue, setFormValue] = useState(form)

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
        
        return(
            
            <>
                <Button variant="outlined" size="small" sx={{margin:1, color:'black', borderColor:'black', minWidth: '36px', padding:'5px'}}><AddIcon></AddIcon></Button>
            </>
        )
        
    }