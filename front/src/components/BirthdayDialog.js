import { 
    TableContainer,
    TableHead,
    Paper,
    Table,
    ThemeProvider } from "@mui/material";
import React from "react";
import globalTheme from "../styles/globalTheme";


export default function BirthdayDialog() {

    const data = [
        {id: 1, name: "Jaanika", birthday: "20.12.2022"},
        {id: 2, name: "Meelis", birthday: "21.12.2022"},
        {id: 3, name: "Krõõt", birthday: "22.12.2022"},

    ]
    return(
        <ThemeProvider theme={globalTheme}>
                <Paper>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                Upcoming birthdays
                            </TableHead>
                        </Table>

                    </TableContainer>

                </Paper>



        </ThemeProvider>
    )

}