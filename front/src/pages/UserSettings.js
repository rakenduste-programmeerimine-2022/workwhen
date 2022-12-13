import { 
    Box,
    Container,
    Paper,
    Avatar,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Snackbar,
    Alert,
    FormControl,
    FormHelperText,
    ThemeProvider
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import globalTheme from "../styles/globalTheme";



export default function UserSettings() {
    const navigate = useNavigate()
    const [openPwdChange, setOpenPwdChange] = useState(false);
    const handleOpenPwdChange = () => {
        setOpenPwdChange(true);
    }
    const handleClosePwdChange = () => {
        setOpenPwdChange(false);
    }
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.dispatchEvent(new Event("logout"))
        navigate("/")
    }   

    const [items, setItems] = useState([]);
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
         setItems(items);
        }
      }, []);

    const form = {
        username: "",
        currentPwd: "",
        newPwd: "",
        confirmPwd: ""
    }

    const snackbar = {
        text: "",
        severity: ""
    }      

    const [formValue, setFormValue] = useState(form)
    const handleFormChange = e => {
        const { value, name } = e.target
        const newValue = {
            ...formValue,
            [name]: value,
            username: items.username
        }
        setFormValue(newValue)
    }   



    const [helperText, setHelperText] = useState("")
    const [success, setSuccess] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const handleSnackClose = () => {
        setSnackOpen(false)
    }
    const [snackbarInfo, setSnackbarInfo] = useState(snackbar)

    const handleSubmit = e => {
        e.preventDefault()
        if(formValue.newPwd === formValue.confirmPwd){
            setHelperText("")
            axios.post("http://localhost:8080/user/change-password", {
                username: formValue.username,
                currentPwd: formValue.currentPwd,
                newPwd: formValue.newPwd
            },
            { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
            
            .then(function(response) {
                if(response.data === "Successfully changed password!"
                && response.data !== null){
                    setSnackOpen(true)
                    setSnackbarInfo({
                        text: response.data,
                        severity: "success"
                    })
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
                console.log(error)

                if(error.response){

                    setHelperText(error.response.data.errors[0].msg);
                    setSnackOpen(true)
                    setSnackbarInfo({
                        text: "Something went wrong!",
                        severity: "error"
                    })
                } 
            })
            setFormValue(form)
            handleClosePwdChange()
        } else {
            setHelperText("Passwords don't match!")
        } 
    }   


    return(
        <ThemeProvider theme={globalTheme}>
        <Container>
            <Paper>
                <Avatar sx={{ m: 2, bgcolor: "black", color: "#e4c5af", width: 60, height: 60, backgroundColor: "#2F3E46"}}>JK</Avatar>
                    <Box>
                        <TableContainer noValidate sx={{ marginTop: "5px", marginBottom: "0px" }}>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>{items.fullname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell>{items.username}</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell>e-mail</TableCell>
                                        <TableCell>{employeeData.email}</TableCell>
                                    </TableRow> */}
                                </TableBody>
                            </Table>
                            <Table>

                                    <Button
                                        onClick={handleOpenPwdChange}
                                        variant="contained"
                                        margin="dense"
                                    >
                                        Change password
                                    </Button>


                                    <Button
                                        onClick={handleLogout}
                                        variant="contained"
                                        margin="dense"
                                    >
                                        Logout
                                    </Button>

                            </Table>
                        </TableContainer>
                    </Box>
                    <Dialog 
                        open={openPwdChange}
                        onClose={handleClosePwdChange}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <Box>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">Password change</DialogContentText>
                            </DialogContent>
                            <FormControl>
                                <TextField
                                    defaultValue={formValue.currentPwd}
                                    onChange={e => handleFormChange(e)}
                                    required
                                    id="currentPwd"
                                    name="currentPwd"
                                    label="Current password"
                                    type="password"
                                    variant="standard"
                                    sx={{ p: 2}}
                                />
                                <TextField
                                    defaultValue={formValue.newPwd}
                                    onChange={e => handleFormChange(e)}
                                    required
                                    id="newPwd"
                                    name="newPwd"
                                    label="New password"
                                    type="password"
                                    variant="standard"
                                    sx={{ p: 2}}
                                />
                                <TextField
                                    defaultValue={formValue.confirmPwd}
                                    onChange={e => handleFormChange(e)}
                                    required
                                    id="confirmPwd"
                                    name="confirmPwd"
                                    label="Repeat new password"
                                    type="password"
                                    variant="standard"
                                    sx={{ p: 2}}
                                />
                            <FormHelperText error>
                                {helperText}
                            </FormHelperText>
                            <DialogActions>                            
                                <Button
                                    variant="contained"
                                    margin="dense"
                                    onClick={handleClosePwdChange}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    autoFocus
                                >
                                    Change!
                                </Button>
                            </DialogActions>
                        </FormControl>
                        </Box>
			        </Dialog>
                    <Snackbar sx={{ backgroundColor: "" }} open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
                            {snackbarInfo.text}
                        </Alert>
                    </Snackbar>
            </Paper>
        </Container>
    </ThemeProvider>

    );    
}