import { Box, Container, Paper, Avatar, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";


export default function UserSettings() {

    const employeeData = {
        name: 'Juuli',
        surname: 'Kõver',
        username: 'juulkove',
        email: 'juuli.kover@firma.ee'
    }

    const [anchorUser, setanchorUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setanchorUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
        setanchorUser(null);
    }



    return(
        <Container component="div" maxWidth="xs" sx={{ minWidth: "12rem" }}>
            <Paper elevation={3} sx={{ p: 4, pt: 3}}>
                <Avatar sx={{ m: 1, bgcolor: "black", color: "white", width: 60, height: 60 }}>JK</Avatar>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <TableContainer component="usrSetData" noValidate sx={{ marginTop: "5px", marginBottom: "0px" }}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>{employeeData.name} {employeeData.surname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell>{employeeData.username}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>e-mail</TableCell>
                                        <TableCell>{employeeData.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table>
                                <TableRow>
                                    <Button variant="contained" sx={{ mt: 2, mb: 1, bgcolor: "main", width: "auto" }} margin="dense">
                                        Change password
                                    </Button>
                                </TableRow>
                                <TableRow>
                                    <Button variant="contained" sx={{ mt: 1, mb: 1, bgcolor: "main", width: "auto" }} margin="dense">
                                        Logout
                                    </Button>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Box>  
            </Paper>
        </Container>

    );    
}