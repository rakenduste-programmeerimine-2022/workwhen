import React, { useState } from "react";
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
    CssBaseline} from "@mui/material";
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
    
    const rows = [
        {id: 1, name: "Juku", phone: 5555555, email: "mingi@mail.ee"},
        {id: 2, name: "Kuku", phone: 5555555, email: "mingi@mail.ee"},
        {id: 3, name: "Luku", phone: 5555555, email: "mingi@mail.ee"},
        {id: 4, name: "Muku", phone: 5555555, email: "mingi@mail.ee"},
        {id: 5, name: "Niina", phone: 5555555, email: "mingi@mail.ee"},
        {id: 6, name: "Miina", phone: 5555555, email: "mingi@mail.ee"},
        {id: 7, name: "Siina", phone: 5555555, email: "mingi@mail.ee"},
        {id: 8, name: "Tiina", phone: 5555555, email: "mingi@mail.ee"},
        {id: 9, name: "Kiina", phone: 5555555, email: "mingi@mail.ee"},
        {id: 10, name: "Toomas", phone: 5555555, email: "mingi@mail.ee"},
        {id: 11, name: "Roomas", phone: 5555555, email: "mingi@mail.ee"},
        {id: 12, name: "Meelis", phone: 5555555, email: "mingi@mail.ee"},
        {id: 13, name: "Veelis", phone: 5555555, email: "mingi@mail.ee"},
        {id: 14, name: "Kristiina", phone: 5555555, email: "mingi@mail.ee"},
        {id: 15, name: "Mariina", phone: 5555555, email: "mingi@mail.ee"}
    ]


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                                    </TableCell>
                            </TableHead>
                            <TableBody className="primaryBody">
                                {rows.filter((rows) => {
                                    if(searchQuery == ""){
                                        return rows;                            
                                    } else if(rows.name.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                                        return rows;
                                    } else if(rows.phone.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                                        return rows;
                                    } else if(rows.email.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                                        return rows;
                                    }
                                })}
                                {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                                ).map((row) => (
                                
                                <TableRow>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    {row.phone}
                                </TableCell>
                                <TableCell>
                                    {row.email}
                                </TableCell>
                                <TableCell className="contactButton">
                                    <Button onClick={handleOpenCnctChange}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={handleOpenCnctDelete}>
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
                        count={rows.length}
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
                                margin="dense"
                                onClick={handleCloseCnctChange}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleCloseCnctChange}
                                autoFocus
                            >
                                Change!
                            </Button>
                            
                        </DialogActions>
                    </Box>
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
                            sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto", backgroundColor: "#2F3E46", color: "#e4c5af" }}
                            margin="dense" 
                            onClick={handleCloseCnctDelete}>Tühista</Button>
                        <Button
                            variant="contained"
                            sx={{ mt: 2, mb: 2, bgcolor: "main", width: "auto", backgroundColor: "#2F3E46", color: "#e4c5af" }}
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
                            margin="dense" 
                            onClick={handleCloseCnctAdd}>Cancel</Button>
                        <Button
                            variant="contained"
                            margin="dense"  
                            onClick={handleCloseCnctAdd}>Save</Button>
                    </DialogActions>

                    
                </Dialog>
            </Paper>
            </ThemeProvider>
        );
}