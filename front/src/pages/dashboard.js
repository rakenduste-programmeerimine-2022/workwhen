import * as React from 'react';
import { Button,Divider,Typography} from "@mui/material";
import { Box } from "@mui/system";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import AddIcon from '@mui/icons-material/Add';
import Add from "@mui/icons-material/Add";

export default function Dashboard() {
    
    

    return (
        <Box sx={{display:'flex',padding: 3}}>
            <Box sx={{display: 'flex' ,border: 'solid', border: 1, minWidth: 425 ,justifyContent:'center'}}>
                <Typography sx={{padding:1, display:'flex', alignItems:'center'}}>To-do list <Typography sx={{display:'flex', border:'solid', border: 1, borderRadius:'50%', background: 'red', marginLeft:'5px'}}>5</Typography></Typography>
                <Button variant="outlined" size="small" sx={{margin:1, marginLeft: 'auto', color:'black', borderColor:'black', minWidth: '36px', padding:'5px'}}>Me</Button>
                <Button variant="outlined" size="small" sx={{margin:1, color:'black', borderColor:'black', minWidth: '36px', padding:'5px'}}>
                    <AddIcon></AddIcon>
                </Button>

                <Divider></Divider>

                <Dialog>
                    <DialogContent>
                        <DialogContentText>
                            
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    )
}