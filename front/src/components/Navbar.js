import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const pages = ['Dashboard', 'Shift Planning', 'Schedule', 'Bookmarks', 'Contacts', 'User Settings'];

function Navbar() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl" >
        <Toolbar disableGutters >          
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link style={{textDecoration:'none', color: 'white'}} to={"/Dashboard"}>
            LOGO
            </Link>
            
          </Typography>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, marginLeft: 'auto', gap: 14}} >
                {pages.map((page) => (
                <Link style={{textDecoration:'none', color: 'white'}} to={`/${page}`}>
                  <Button
                      key={page}
                      sx={{color: 'white', display: 'block'}}    
                  >
                      {page}   
                  </Button>
                </Link>
                ))}
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
