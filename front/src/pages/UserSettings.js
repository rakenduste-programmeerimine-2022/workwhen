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
    FormControl
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function UserSettings() {
    const navigate = useNavigate()
    const [anchorUser, setanchorUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setanchorUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
        setanchorUser(null);
    }
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

    const currentUsername = items.username    
    console.log(currentUsername)
    const form = {
        username: currentUsername,
        currentPwd: "",
        newPwd: "",
        confirmPwd: ""
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

    console.log(formValue)

    


    return(
        <Container component="div" maxWidth="xs" sx={{ minWidth: "12rem" }}>
            <Paper elevation={7} sx={{ p: 4, pt: 3}}>
                <Avatar sx={{ m: 1, bgcolor: "black", color: "white", width: 60, height: 60 }}>JK</Avatar>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
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
                                <TableRow>
                                    <Button 
                                        onClick={handleOpenPwdChange}
                                        variant="contained"
                                        sx={{ mt: 2, mb: 1, bgcolor: "main", width: "auto" }}
                                        margin="dense"
                                    >
                                        Change password
                                    </Button>
                                </TableRow>
                                <TableRow>
                                    <Button
                                        onClick={handleLogout}
                                        variant="contained"
                                        sx={{ mt: 1, mb: 1, bgcolor: "main", width: "auto" }}
                                        margin="dense"
                                    >
                                        Logout
                                    </Button>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Dialog 
                        open={openPwdChange}
                        onClose={handleClosePwdChange}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">Password change</DialogContentText>
                        </DialogContent>
                        <Box></Box>
                        <FormControl>
                            <TextField
                                value={formValue.currentPwd}
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
                                value={formValue.newPwd}
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
                                // value={formValue.confirmPwd}
                                onChange={e => handleFormChange(e)}
                                required
                                id="repeatPwdChange"
                                name="repeatPwdChange"
                                label="Repeat new password"
                                type="password"
                                variant="standard"
                                sx={{ p: 2}}
                            />
                            <DialogActions>                            
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                                    margin="dense"
                                    onClick={handleClosePwdChange}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                                    onClick={handleClosePwdChange}
                                    autoFocus
                                >
                                    Change!
                                </Button>
                            </DialogActions>
                        </FormControl>
			        </Dialog>
            </Paper>
        </Container>

    );    
}