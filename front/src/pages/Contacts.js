import React, { useState, useEffect } from "react";
import { 
    Button,
    Dialog,
    Paper,
    Table,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    TextField
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Fullscreen } from "@mui/icons-material";
import axios from "axios";



function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

export default function Contacts(searchQuery) {
    const [contacts, setContacts] = useState([])

    const getData = () => {
        axios.get("http://localhost:8080/contact/all", { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
        .then(function(response) {
            setContacts([])
            response.data.forEach(element => {
                setContacts(oldArr => [...oldArr, element])
            })
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    const theme = createTheme({
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
    });


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contacts.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    const [openContactChange, setOpenCnctChange] = useState(false);
    const handleOpenCnctChange = () => {
        setOpenCnctChange(true);
    }
    const handleCloseCnctChange = () => {
        setOpenCnctChange(false);
    }
    const [openContactDelete, setOpenCnctDelete] = useState(false);
    const handleOpenCnctDelete = () => {
        setOpenCnctDelete(true);
    }
    const handleCloseCnctDelete = () => {
        setOpenCnctDelete(false);
    }   

    const [openContactAdd, setOpenCnctAdd] = useState(false);
    const handleOpenCnctAdd = () => {
        setOpenCnctAdd(true);
    }
    const handleCloseCnctAdd = () => {
        setOpenCnctAdd(false);
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <Paper sx={{ width: '100%'}} elevation={7}>
            <TableContainer sx={{ maxHeight: "78vh", width: '100%' }}>
                <Table>
                    <ThemeProvider theme={theme}>
                        <TableHead variant="header" size="large">
                            <TableRow>
                                <TableCell variant="header" size="large">Contact name</TableCell>
                                <TableCell variant="header" size="large">Contact number</TableCell>
                                <TableCell variant="header" size="large">Contact e-mail</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={handleOpenCnctAdd}
                                    >
                                        Add new contact
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.filter((contacts) => {
                                if(searchQuery == ""){
                                    return contacts;                            
                                } else if(contacts.name.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                                    return contacts;
                                } else if(contacts.phone.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                                    return contacts;
                                } else if(contacts.email.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                                    return contacts;
                                }
                            })}
                            {(rowsPerPage > 0
                            ? contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : contacts
                            ).map((contact) => (
                            
                            <TableRow>
                            <TableCell component="th" scope="row">
                                {contact.name}
                            </TableCell>
                            <TableCell>
                                {contact.phone}
                            </TableCell>
                            <TableCell>
                                {contact.email}
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={handleOpenCnctChange}
                                    // add id
                                >
                                    Edit
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={handleOpenCnctDelete}
                                    // add id
                                >
                                    Delete
                                </Button>
                            </TableCell>
                            </TableRow>
                            ))}

                            {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                            )}
                    
                        </TableBody>
                    </ThemeProvider>
                </Table>
            </TableContainer>
            <TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={contacts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                        'aria-label': 'entries per page',
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableContainer>
            <Dialog
                open={openContactChange}
                onClose={handleCloseCnctChange}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Contact change</DialogContentText>
                </DialogContent>
                    <FormControl
                        className="contactChangeForm"
                        sx={{width: "20rem", p: 2}}
                    >                            
                    </FormControl>
                    <TextField
                        autoFocus
                        id="cnctNameChange"
                        label="New contact name"
                        type="text"
                        variant="standard"
                        sx={{ p: 2}}
                    />
                    <TextField
                        autoFocus
                        id="cnctPhoneChange"
                        label="New contact number"
                        type="text"
                        variant="standard"
                        sx={{ p: 2}}
                    />
                    <TextField
                        autoFocus
                        id="cnctEmailChange"
                        label="New contact email"
                        type="text"
                        variant="standard"
                        sx={{ p: 2}}
                    />
                    <DialogActions>                            
                        <Button
                            variant="contained"
                            sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                            margin="dense"
                            onClick={handleCloseCnctChange}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                            onClick={handleCloseCnctChange}
                            autoFocus
                        >
                            Change!
                        </Button>
                        
                    </DialogActions>
            </Dialog>
            <Dialog
                open={openContactDelete}
                onClose={handleCloseCnctDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{}}                                
            >
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                        margin="dense" 
                        onClick={handleCloseCnctDelete}>Tühista</Button>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                        margin="dense"  
                        onClick={handleCloseCnctDelete}>Kustuta</Button>
                </DialogActions>
                
            </Dialog>
            <Dialog
                open={openContactAdd}
                onClose={handleCloseCnctAdd}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{}}                                
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Add new contact</DialogContentText>
                </DialogContent>
                    <FormControl
                        className="contactAddForm"
                        sx={{width: "20rem", p: 2}}
                    >                            
                    </FormControl>
                    <TextField
                        autoFocus
                        id="cnctNameAdd"
                        label="New contact name"
                        type="text"
                        variant="standard"
                        sx={{ p: 2}}
                    />
                    <TextField
                        autoFocus
                        id="cnctPhoneAdd"
                        label="New contact number"
                        type="text"
                        variant="standard"
                        sx={{ p: 2}}
                    />
                    <TextField
                        autoFocus
                        id="cnctEmailAdd"
                        label="New contact email"
                        type="text"
                        variant="standard"
                        sx={{ p: 2}}
                    />
                    <DialogActions>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                        margin="dense" 
                        onClick={handleCloseCnctAdd}>Cancel</Button>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto" }}
                        margin="dense"  
                        onClick={handleCloseCnctAdd}>Save</Button>
                </DialogActions>
                
            </Dialog>
        </Paper>
    );
}