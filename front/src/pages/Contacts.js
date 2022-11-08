import React, { useState } from "react";
import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function Contacts() {


    return(
        <Paper sx={{ width: '100%'}} elevation={2}>
            <TableContainer sx={{ maxHeight: "78vh", width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ettevõte/Isiku nimi</TableCell>
                            <TableCell>Ettevõte/Isiku number</TableCell>
                            <TableCell>Ettevõte/Isiku email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>



    );
}
