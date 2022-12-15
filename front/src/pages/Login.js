import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { 
    Container, 
    Button, 
    FormHelperText, 
    Paper, 
    TextField, 
    Box, 
    Avatar, 
    FormControl, 
    Snackbar,
    Alert
} from "@mui/material"
import axios from "axios"

export default function Login(){
    const form = {
        username: "",
        password: ""
    }
    const snackbar = {
        text: "",
        severity: ""
    }

    let navigate = useNavigate()
    // const { setUser } = useContext(UserContext)

    const [formValue, setFormValue] = useState(form)
    const [helperText, setHelperText] = useState("")
    const [snackbarInfo, setSnackbarInfo] = useState(snackbar)
    const [snackOpen, setSnackOpen] = useState(false)

    const handleFormChange = e => {
        const { value, name } = e.target
        const newValue = {
            ...formValue,
            [name]: value
        }
        setFormValue(newValue)
    }

    const handleSnackClose = () => {
        setSnackOpen(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(formValue.password && formValue.username){
            setHelperText("")
            axios.post("http://localhost:8080/user/login", formValue)
            .then(function(response) {
                if(typeof response.data === "object" && response.data !== null && response.data.token){
                    setSnackOpen(true)
                    setSnackbarInfo({
                        text: "Logged in!",
                        severity: "success"
                    })
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.data))
                    window.dispatchEvent(new Event("login"))
                    navigate("/dashboard")
                } else if (typeof response.data === "string" && response.data !== null){
                    setSnackOpen(true)
                    setSnackbarInfo({
                        text: response.data,
                        severity: "error"
                    })
                } else {
                    setSnackOpen(true)
                    setSnackbarInfo({
                        text: "Something went wrong!",
                        severity: "error"
                    })
                }
            })
            .catch(function(error) {
                if(error.response){
                    console.log(error.response)
                    setSnackOpen(true)
                    setSnackbarInfo({
                        text: "Something went wrong!",
                        severity: "error"
                    })
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

    useEffect(() => {
        if(localStorage.getItem("token") && localStorage.getItem("user")){
            navigate("/dashboard")
        }
    }, [])

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
                        <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                            <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
                                {snackbarInfo.text}
                            </Alert>
                        </Snackbar>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
