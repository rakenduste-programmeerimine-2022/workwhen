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
            main: Colors.secondary
        },

    },
    components: {
        MuiTableCell: {
            variants: [
                {
                props: { variant: 'header'},
                style: {
                    textTransform: 'capitalize',
                    fontFamily: "Overpass",
                    fontWeight: 'bold',
                    fontSize: 16,
                },

                },
            ],
        },
        MuiPaper: {
            styleOverrides: {
                root: ({  }) => ({

                    backgroundColor: "#e4c5af",
                    maxWidth: "80%",
                    overflow: "visible",
                    elevation: "7",
                    margin: "5%",
                    fontFamily: "Overpass",
                }),          

            },
        },

        MuiTable: {
            styleOverrides: {
                root: ({ }) => ({
                    justifyContent: "center",
                    alignContent: "center",

                }),
            },
        },

        MuiTableContainer: {
            styleOverrides: {
                root: ({ }) => ({
                    overflow: "visible",
                }),
            },
        },

        MuiTableRow: {
            styleOverrides: {
                root: ({ }) => ({
                    alignContent: "center"

                }),
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: ({ }) => ({
                    "&.MuiFormLabel-root.Mui-focused": {
                        color: "black"
                    }

,
                }),
            },
        },

    


        MuiInput: {
            styleOverrides: {
                root: {
                    "&.MuiFormLabel-root.Mui-focused": {
                        color: "black"

                    },
                },
                input: {
                    borderRadius: 4,
                }
            },
        },

        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: "black",
                },
            },
        },

        MuiLink: {
            styleOverrides: {
                root: ({ }) => ({
                    color: "#354f52",
                    underline:"hover",
                }),
            },
        },

        MuiButton: {
            styleOverrides: {
                root: ({ }) => ({
                    backgroundColor: "#2F3E46",
                    color: "#e4c5af",
                    margin: "5px",
                    maxWidth: "10rem"

                }),
            },
        },


        MuiBox: {
            styleOverrides: {
                root: ({ }) => ({
                    backgroundColor: "#e4c5af",
                    overflow: "visible",
                    margin: "5%"
                }),
            },
        },

        MuiDialog: {
            styleOverrides: {
                root: ({ }) => ({
                    width: "auto",
                }),
            },
        },
    },    


});

export default globalTheme;