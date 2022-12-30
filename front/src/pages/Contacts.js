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
    TextField, 
    CssBaseline,
    Snackbar,
    Alert
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
import { ThemeProvider, useTheme } from '@mui/material/styles';
import globalTheme from "../styles/globalTheme";
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

function axiosPost({ name, email, phone }, id, link){
    return new Promise(async (resolve, reject) => {
        if(name !== "" || email !== "" || phone !== "" || id !== ""){
            axios.post(`http://localhost:8080/contact/${link}`, id !== "" ? {
                id,
                name,
                email,
                phone
            } : { name, email, phone },
            { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
            .then(function(response) {
                if(typeof response.data === "object" && response.data !== null){
                    resolve("All good!")
                } else if (typeof response.data === "string" && response.data === "Successfully deleted!"){
                    resolve("Successfully deleted!")
                } else {
                    reject("Something weird came from the server")
                }
            })
            .catch(function(error) {
                if(error.response){
                    console.log(error.response)
                    reject("Check inputs - make sure that they are in the correct format!")
                } else if (error.request){
                    console.log(error.request)
                    reject("Bad request!")
                } else {
                    console.log(error.message)
                    reject("Something went wrong!")
                }
                reject("Server error")
            })
        } else {
            reject("Please fill all fields!")
        }
    })
}

export default function Contacts() {
    const form = {
        name: "",
        email: "",
        phone: ""
    }

    const [searchResult, setSearchResult] = useState([])

    const [contacts, setContacts] = useState([])
    const [formValue, setFormValue] = useState(form)
    const [searchQuery, setSearchQuery] = useState("")
    const [cancelSearch, setCancelSearch] = useState(false)
    const [contactId, setContactId] = useState("")
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackbarInfo, setSnackbarInfo] = useState({
        text: "",
        severity: ""
    })

    const handleSnackClose = () => {
        setSnackOpen(false)
    }
    // const handleSearchQuery = (e) => {
    //     const { value, name } = e.target
    //     const newValue = {
    //         ...searchQuery,
    //         [name]: value
    //     }
	// 	setSearchQuery(newValue);
	// };



    // console.log(contacts)

    console.log(contacts.filter(contact=>contact.name.includes(searchQuery)))

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
    const handleContactChangeSave = () => {
        axiosPost(formValue, contactId, "edit")
            .then((response) => {
                setSnackOpen(true)
                setSnackbarInfo({
                    text: response,
                    severity: "success"
                })
                getData()
                setOpenCnctChange(false)
                setFormValue(form)
            })
            .catch((error) => {
                setSnackOpen(true)
                setSnackbarInfo({
                    text: error,
                    severity: "error"
                })
            })
    }
    const handleOpenCnctChange = (e) => {
        setOpenCnctChange(true)
        setContactId(e.currentTarget.id)
    }

    const handleCloseCnctChange = (e) => {
        setOpenCnctChange(false);
        setFormValue(form);
        setContactId("");
    }
    const [openContactDelete, setOpenCnctDelete] = useState(false);
    const handleOpenCnctDelete = (e) => {
        setOpenCnctDelete(true);
        setContactId(e.currentTarget.id);
    }
    const handleCloseCnctDelete = () => {
        setOpenCnctDelete(false);
        setContactId("");
    }   

    const [openContactAdd, setOpenCnctAdd] = useState(false);
    const handleOpenCnctAdd = () => {
        setOpenCnctAdd(true);
    }
    const handleCloseCnctAdd = () => {
        setOpenCnctAdd(false);
        setFormValue(form);
    }

    const handleAddCnctSave = () => {
        axiosPost(formValue, "", "add")
            .then((response) => {
                setSnackOpen(true)
                setSnackbarInfo({
                    text: response,
                    severity: "success"
                })
                getData()
                setOpenCnctAdd(false)
                setFormValue(form)
            })
            .catch((error) => {
                setSnackOpen(true)
                setSnackbarInfo({
                    text: error,
                    severity: "error"
                })
            })
    }

    const handleCnctDelete = () => {
        axiosPost({}, contactId, "remove")
            .then((response) => {
                setSnackOpen(true)
                setSnackbarInfo({
                    text: response,
                    severity: "success"
                })
                getData()
                setOpenCnctDelete(false)
            })
            .catch((error) => {
                setSnackOpen(true)
                setSnackbarInfo({
                    text: error,
                    severity: "error"
                })
            })
    }
    const handleFormChange = e => {
        const { value, name } = e.target
        const newValue = {
            ...formValue,
            [name]: value
        }
        setFormValue(newValue)
    }

    useEffect(() => {
        getData()
    }, [])

    // const tableSearch = e => {
    //     if(searchQuery != ""){
    //         const { value, name } = e.target
    //         const searchResult = {
    //             ...contacts,
    //             [name]: value
    //         }
    //         setContacts(searchResult)
            
    //     }
    //     console.log(contacts)        

    // };

    // console.log(contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery)))

 


        return(
            <ThemeProvider theme={globalTheme}>
            <CssBaseline />
            <Paper>
                <TableContainer>
                    <Table className="primaryTable" >
                        <colgroup>
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                        </colgroup>
                            <TableHead variant="header" size="large" className="primary">
                                {/* <TableRow> */}
                                    <TableCell sx={{ fontWeight: "bold" }}>Contact name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Contact number</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Contact e-mail</TableCell>
                                    <TableCell>
                                        <Button onClick={handleOpenCnctAdd}>
                                            Add new contact
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            label="search..."
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        
                                    </TableCell>

                            </TableHead>
                            <TableBody className="primaryBody" >

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
                                <TableCell className="contactButton">
                                    <Button 
                                        onClick={handleOpenCnctChange}
                                        id={contact._id}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        onClick={handleOpenCnctDelete}
                                        id={contact._id}
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
                    </Table>
                </TableContainer>
                <TableContainer className="primary">
                    <TablePagination
                        rowsPerPageOptions={[5, 20, 40, { label: 'All', value: -1 }]}
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
                <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity={snackbarInfo.severity}>
                        {snackbarInfo.text}
                    </Alert>
                </Snackbar>
                <Dialog
                    open={openContactChange}
                    onClose={handleCloseCnctChange}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column", 
                            backgroundColor: "#E4C5AF",
                        }}
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

                            id="cnctChange"
                            name="name"
                            value={formValue.name}
                            onChange={e => handleFormChange(e)}
                            label="New contact name"
                            type="text"
                            variant="standard"
                            sx={{ p: 2}}
                        />
                        <TextField
                            autoFocus
                            id="cnctChange"
                            name="phone"
                            value={formValue.phone}
                            onChange={e => handleFormChange(e)}
                            label="New contact number"
                            type="text"
                            variant="standard"
                            sx={{ p: 2}}
                        />
                        <TextField
                            autoFocus
                            id="cnctChange"
                            name="email"
                            value={formValue.email}
                            onChange={e => handleFormChange(e)}
                            label="New contact email"
                            type="text"
                            variant="standard"
                            sx={{ p: 2}}
                        />
                        <DialogActions>                            
                            <Button
                                variant="contained"                                
                                margin="dense"
                                onClick={handleCloseCnctChange}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleContactChangeSave}
                                autoFocus
                            >
                                Change
                            </Button>
                            
                        </DialogActions>
                    </Box>
                </Dialog>
                <Dialog
                    open={openContactDelete}
                    onClose={handleCloseCnctDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{}} // ?
                >
                    <DialogContentText 
                        id="alert-dialog-delete"
                        sx={{padding: "8% 0 0 5%"}}
                    >
                        Are you sure?
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            variant="contained"
                            sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto", backgroundColor: "#2F3E46", color: "#e4c5af" }}
                            margin="dense" 
                            onClick={handleCloseCnctDelete}>Cancel</Button>
                        <Button
                            variant="contained"
                            sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto", backgroundColor: "#2F3E46", color: "#e4c5af" }}
                            margin="dense"  
                            onClick={handleCnctDelete}>Delete</Button>
                    </DialogActions>

                    
                </Dialog>

                <Dialog
                    open={openContactAdd}
                    onClose={handleCloseCnctAdd}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{}} // ?
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
                            name="name"
                            value={formValue.name}
                            onChange={e => handleFormChange(e)}
                            type="text"
                            variant="standard"
                            sx={{ p: 2}}
                        />
                        <TextField
                            autoFocus
                            id="cnctPhoneAdd"
                            label="New contact number"
                            name="phone"
                            value={formValue.phone}
                            onChange={e => handleFormChange(e)}
                            type="text"
                            variant="standard"
                            sx={{ p: 2}}
                        />
                        <TextField
                            autoFocus
                            id="cnctEmailAdd"
                            label="New contact email"
                            name="email"
                            value={formValue.email}
                            onChange={e => handleFormChange(e)}
                            type="text"
                            variant="standard"
                            sx={{ p: 2}}
                        />
                        <DialogActions>
                        <Button
                            variant="contained"
                            margin="dense" 
                            onClick={handleCloseCnctAdd}>Cancel</Button>
                        <Button
                            variant="contained"
                            margin="dense"  
                            onClick={handleAddCnctSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
            </ThemeProvider>
        );
}