import { Grid, Paper, Button,Divider} from "@mui/material";
import { Box, Container} from "@mui/system";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

export default function Dashboard() {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
      }));

    return (
        <Container component="div" maxWidth="xs" sx={{ minWidth: "20rem", marginLeft:0, marginTop:3}} >
            <Paper elevation={3} sx={{ p: 1}}>
                <Grid container spacing={24}>
                    <Grid item xs={6.5} sx={{display:"flex", alignItems:"center", justifyContent:"left"}}>
                        <Item sx={{display:"flex", boxShadow:"none", fontSize:16}}>To-do list</Item>
                        <Item sx={{display:"none", boxShadow:"none", padding:0, fontSize:16, border:1, borderRadius:'50%', bgcolor:"#FA8072"}}></Item>           
                    </Grid>
                        
                    <Grid item xs={4.5} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Item sx={{display:"flex", textAlign:"center", boxShadow:"none"}}>
                            <Button variant="outlined" style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', borderColor: "black", color:"black"}}>Me</Button>
                        </Item>
                        <Item sx={{display:"flex", textAlign:"center", boxShadow:"none"}}>
                            <Button variant="outlined" style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', borderColor: "black", color:"black"}}>
                                <AddIcon />    
                            </Button>
                        </Item>
                    </Grid>
                </Grid>
                <Divider></Divider>


            </Paper>
            
        </Container>
    )
}