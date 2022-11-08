import React, { useEffect, useState } from 'react';
import { Button,Divider,Paper,Typography} from "@mui/material";
import { Box } from "@mui/system";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';
import TodoDialog from "../components/TodoDialog"


export default function Dashboard() {
    const [todoArr, setTodoArr] = useState([])
    
    const getData = () => {
        axios.get("http://localhost:8080/todo/all")
        .then(function(response) {
            setTodoArr([])
            response.data.forEach(element => {
                setTodoArr(oldArr => [...oldArr, element])
                    }
                )
            }
        )
    }


    useEffect(() => {
        getData()
    }, [])
    return (
        <Box sx={{display:'flex',padding: 3}}>
            <Paper elevation={7} sx={{display: 'flex' , minWidth: 450 ,justifyContent:'center'}}>
                <Typography sx={{padding:1, display:'flex', alignItems:'center'}}>To-do list <Typography sx={{display:'flex', border:'solid', border: 1, borderRadius:'50%', background: 'red', marginLeft:'5px', padding:'2px'}}>5</Typography></Typography>
                <Button variant="outlined" size="small" sx={{margin:1, marginLeft: 'auto', color:'black', borderColor:'black', minWidth: '36px', padding:'5px'}}>Me</Button>
                <TodoDialog getData={getData}/>

                <Divider />

                <Dialog>
                    <DialogContent>
                        <DialogContentText>
                            
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Paper>
        </Box>
    )
}