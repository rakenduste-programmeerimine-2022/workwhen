import React from "react";
import { createTheme } from "@mui/material/styles";

const Colors = {
    primary: "#e4c5af",
    secondary: "#354f52",
    success: "#33ca7f",
    danger: "#fe5f55",
    warning: "#fe5f55",


};

const globalTheme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        secondary: {
            main: Colors.secondary
        }
    },
    components: {
        MuiTableCell: {
            variants: [
                {
                props: { variant: 'header'},
                style: {
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    fontSize: 16,
                },

                },
            ],
        },
    },
    root: {
        "& .MuiPaper-root": {
            primary: Colors.primary
        }
    },

    
});

export default globalTheme;