import { Box, Container, Paper, Avatar, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";


export default function UserSettings() {
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
                    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <TableContainer component="usrSetData" noValidate sx={{ marginTop: "5px", marginBottom: "0px" }}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Juuli Kõver</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell>juulkove</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>e-mail</TableCell>
                                        <TableCell>juuli.kover@firma.ee</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableRow>
                                    <Button>
                                        Change password
                                    </Button>
                                    </TableRow>
                                    <TableRow>
                                    <Button>
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