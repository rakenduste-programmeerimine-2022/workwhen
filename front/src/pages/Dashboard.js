import React, { useEffect, useState } from 'react';
import { Button,Divider,Paper,TableContainer,Typography, Table, TableHead, TableCell, TableBody, TableRow, ThemeProvider} from "@mui/material";
import { Box, Container} from "@mui/system";
import axios from 'axios';
import TodoDialog from "../components/TodoDialog"
import moment from 'moment'
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import BirthdayDialog from '../components/BirthdayDialog';
import globalTheme from '../styles/globalTheme';



export default function Dashboard() {
    const [todoArr, setTodoArr] = useState([])
    const [usersArr, setUsersArr] = useState([])

    const now = new Date()
    const priorDate = new Date(new Date().setDate(now.getDate() +30))
    const priorMonth = priorDate.getMonth()
    console.log(priorMonth)


    const getData = () => {
        axios.get("http://localhost:8080/todo/all", 
        {
            params: { completed: false }, 
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(function(response) {
            setTodoArr([])
            response.data.forEach(element => {
                setTodoArr(oldArr => [...oldArr, element])
                }
            )  
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    const getUsers = () => {
        axios.get("http://localhost:8080/user/all", 
        {
            params: { completed: false }, 
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(function(response) {
            setUsersArr([])
            response.data.forEach(element => {
                console.log(element.birthday)
                const userBirthday = element.birthday
                const cuttedBirthday = userBirthday.slice(5, 6);
                console.log(cuttedBirthday)

                if(cuttedBirthday == priorMonth ){
                    setUsersArr(oldArr => [...oldArr, element])
                }
                }
            )  
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    

    const handleDelete = e => {
        console.log(e.currentTarget.id)
        const id = e.currentTarget.id
        axios.post("http://localhost:8080/todo/remove",
            {id},
            { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} }
        )
        .then(function(response){
            console.log(response)
            getData()
        })
        .catch(function(error){
            if(error.response){
                console.log(error.response)
            } else if (error.request){
                console.log(error.request)
            } else {
                console.log(error.message)
            }
        })
    }

    const handleCompleted = e => {
        console.log(e.currentTarget.id)
        const id = e.currentTarget.id
        axios.post("http://localhost:8080/todo/update",
            {id},
            { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} }
        )
        .then(function(response){
            console.log(response)
            getData()
        })
        .catch(function(error){
            if(error.response){
                console.log(error.response)
            } else if (error.request){
                console.log(error.request)
            } else {
                console.log(error.message)
            }
        })
    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getUsers()

    }, [])

    return (
        <Container sx={{display:'flex', padding: 3, width: 500, margin: 0}}>
            <Paper elevation={7} sx={{display: 'flex', flexDirection: 'column', minWidth: 450, backgroundColor: "#E4C5AF"}}>
                <Box sx={{display:"flex"}}>
                    <Typography sx={{padding:1, display:'flex', alignItems:'center'}}>To-do list
                        <Typography
                            sx={{display:'flex',border:'solid 1', borderRadius:'50%', background: 'red', marginLeft:'5px', padding:'2px'}}
                        >
                            5
                        </Typography>
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{margin:1, marginLeft: 'auto', color:'black', borderColor:'black', maxWidth: '36px', padding:'5px'}}
                    >
                        Me
                    </Button>
                    <TodoDialog getData={getData}/>
                </Box>
                <Divider />
                <Box sx={{display:"flex", flexDirection:"column", overflow:"hidden", overflowY:"scroll", marginTop:"5px", width:450, height:500}}>
                    {todoArr.length === 0 ? <Typography>No todos</Typography> : todoArr.map(item => {
                        return(
                            <Box sx={{display:"flex", marginTop:"10px", padding:2, border:"solid", border:1}}>
                                    Title: {item.title}<br />
                                    Description: {item.description}<br />
                                    Due Date: {moment(item.date).format('MMM Do YY')}<br />
                                    Assigned: {item.assigned}<br />
                                    <Box sx={{marginLeft:"auto", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <Button 
                                            variant='outlined'
                                            color="success"
                                            id={item._id}
                                            onClick={e => handleCompleted(e)} 
                                            sx={{height:"50px", width:"50px"}}
                                        >
                                            <CheckIcon />
                                        </Button>
                                        <Button
                                            variant='outlined'
                                            color="error" 
                                            id={item._id}
                                            onClick={e => handleDelete(e)}
                                            sx={{height:"50px", width:"50px"}}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Box>
                                    <br />
                                    <Divider />
                            </Box>
                        )
                    })}
                </Box>
            </Paper>
            <ThemeProvider theme={globalTheme}>
            <Paper sx={{ ml: 5, minWidth: "600px", maxHeight: "200px" }}>
            <TableContainer>
                        <Table>
                            <TableHead >
                                <TableCell sx={{ textAlign: "center"}}>Upcoming birthdays</TableCell>

                            </TableHead>
                            <TableBody>
                                {usersArr.map((user) => (
 
                                <TableRow
                                key={usersArr.fullname}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    {user.fullname}
                                    </TableCell>
                                    <TableCell align="right">{user.birthday.slice(0, 10)}</TableCell>


                                </TableRow>
                            ))}
                            </TableBody>

                        </Table>

                    </TableContainer>
            </Paper>
            </ThemeProvider>
        </Container>

        

    )
}
