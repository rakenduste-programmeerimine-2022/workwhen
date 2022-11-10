import React, { useState } from "react";
import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function Contacts() {
    
    function ContactsData() {
        const data = [
            {id: 1, name: "Juku", phone: 5555555, email: "mingi@mail.ee"},
            {id: 2, name: "Kuku", phone: 5555555, email: "mingi@mail.ee"},
            {id: 3, name: "Luku", phone: 5555555, email: "mingi@mail.ee"},
            {id: 4, name: "Muku", phone: 5555555, email: "mingi@mail.ee"},
            {id: 5, name: "Niina", phone: 5555555, email: "mingi@mail.ee"},
            {id: 6, name: "Miina", phone: 5555555, email: "mingi@mail.ee"},
            {id: 7, name: "Siina", phone: 5555555, email: "mingi@mail.ee"},
            {id: 8, name: "Tiina", phone: 5555555, email: "mingi@mail.ee"}
        ]

    }


    return(
        <Paper sx={{ width: '100%'}} elevation={2}>
            <TableContainer sx={{ maxHeight: "78vh", width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Contact name</TableCell>
                            <TableCell>Contact number</TableCell>
                            <TableCell>Contact e-mail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>



    );
}