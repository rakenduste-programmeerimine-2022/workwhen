import React from "react";
import { Paper } from "@mui/material";

const GlobalPaper = (props) => {
    return (
        <Paper
            sx={{ 
            maxWidth: "90%",
            maxHeight: "vh",
            backgroundColor: "#E4C5AF" }}
            elevation={7}
            className="contactPaper"
        >
        </Paper>
    )
}

export default GlobalPaper;