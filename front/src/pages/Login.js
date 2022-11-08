import React, { useState } from "react"
import { Container, Button, FormHelperText, Paper, TextField, Box, Avatar, FormControl } from "@mui/material"
import axios from "axios"

export default function Login(){
    const form = {
        username: "",
        password: ""
    }

    const [formValue, setFormValue] = useState(form)
    const [helperText, setHelperText] = useState("")

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
        if(formValue.password && formValue.username){
            setHelperText("")
            axios.post("http://localhost:8080/user/login", formValue)
            .then(function(response) {
                console.log(response)
                localStorage.setItem("token", response.data)
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
            setHelperText("Please fill all fields")
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
                            <FormHelperText error>
                                {helperText}
                            </FormHelperText>
                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                margin="normal"
                            >
                                Login
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
