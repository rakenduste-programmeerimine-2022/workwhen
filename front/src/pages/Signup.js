import React, { useState } from "react"
import { Container, Button, FormHelperText, Paper, TextField, Typography, Box, Avatar, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import axios from "axios"
import dayjs from "dayjs"
import et from "dayjs/locale/et"

export default function Signup(){
    const roles = ["employee", "admin", "scheduler"]

    const form = {
        username: "",
        email: "",
        password: "",
        confirmPwd: "",
        fullname: "",
        contactNr: "",
        birthday: "",
        role: ""
    }

    const [formValue, setFormValue] = useState(form)
    const [helperText, setHelperText] = useState("")
    const [success, setSuccess] = useState(false)

    const handleFormChange = e => {
        const { value, name } = e.target
        const newValue = {
            ...formValue,
            [name]: value
        }
        setFormValue(newValue)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(formValue)
        if(formValue.password && formValue.password === formValue.confirmPwd){
            setHelperText("")
            axios.post("http://localhost:8080/user/signup", {
                username: formValue.username,
                email: formValue.email,
                password: formValue.password,
                fullname: formValue.fullname,
                contact: formValue.contactNr,
                birthday: formValue.birthday,
                role: formValue.role
            })
            .then(function(response) {
                console.log(response)
                setSuccess(true)
            })
            .catch(function(error) {
                if(error.response){
                    console.log(error.response)
                    setHelperText(error.response.data.errors[0].msg)
                } else if (error.request){
                    console.log(error.request)
                } else {
                    console.log(error.message)
                }
            })
        } else {
            setHelperText("Passwords don't match!")
        }
    }

    return(
        <Container component="div" maxWidth="xs" sx={{ minWidth: "12rem" }}>
            <Paper elevation={3} sx={{ p: 4, pt: 3}}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Avatar sx={{ m: 1, bgcolor: "white", color: "black" }} />
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <FormControl>
                            <TextField
                                value={formValue.username}
                                onChange={e => handleFormChange(e)}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                            />
                            <TextField
                                value={formValue.email}
                                onChange={e => handleFormChange(e)}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                            />
                            <TextField
                                value={formValue.password}
                                onChange={e => handleFormChange(e)}
                                margin="normal"
                                required
                                type="password"
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                            />
                            <FormHelperText>Password must be min. 5 characters</FormHelperText>
                            <TextField
                                value={formValue.confirmPwd}
                                onChange={e => handleFormChange(e)}
                                margin="normal"
                                required
                                type="password"
                                fullWidth
                                id="confirmPwd"
                                label="Confirm password"
                                name="confirmPwd"
                            />
                            <TextField
                                value={formValue.fullname}
                                onChange={e => handleFormChange(e)}
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Full name"
                                name="fullname"
                            />
                            <TextField
                                value={formValue.contactNr}
                                onChange={e => handleFormChange(e)}
                                margin="normal"
                                fullWidth
                                id="contactNr"
                                label="Contact Nr"
                                name="contactNr"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={et}>
                                <DatePicker
                                    id="birthday"
                                    name="birthday"
                                    label="Birthday"
                                    invalidDateMessage="Error picking date"
                                    inputFormat="DD.MM.YYYY"
                                    mask="__.__.____"
                                    value={formValue.birthday}
                                    onChange={value => setFormValue({...formValue, birthday: dayjs(value).format("YYYY-MM-DD")})}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <FormControl sx={{ marginTop: "1rem", marginBottom: "1rem"}}>
                                <InputLabel id="role">Role</InputLabel>
                                <Select
                                    id="role"
                                    label="Role"
                                    name="role"
                                    value={formValue.role}
                                    onChange={e => handleFormChange(e)}
                                >
                                    {roles.map((role) => {
                                        return(
                                            <MenuItem value={role}>{role}</MenuItem> 
                                        )
                                    })} 
                                </Select>
                            </FormControl>
                            
                            
                            <FormHelperText error>
                                {helperText}
                            </FormHelperText>
                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                margin="normal"
                            >
                                Create user
                            </Button>
                            {success && <Typography>User created!</Typography>}
                        </FormControl>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}