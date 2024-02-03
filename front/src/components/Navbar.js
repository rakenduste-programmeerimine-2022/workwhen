import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "../styles/index.css";
import Logo from "../styles/logo.png";


const pages = {
    'Dashboard': 'dashboard',
    'Shift Planning': 'shift-planning',
    'Schedule': 'schedule',
    'Bookmarks': 'bookmarks',
    'Contacts': 'contacts',
    'User Settings': 'user-settings'
};

function Navbar() {

  return (
    <AppBar position='static' >
      <Container maxWidth='xl'>
        <Toolbar disableGutters >          
          <Typography
            variant='h6'
            noWrap
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',

              textDecoration: 'none',
            }}
          >
            <Link style={{textDecoration:'none'}} to={'/dashboard'}>
            <img src={Logo} />
            </Link>
            
          </Typography>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, marginLeft: 'auto', gap: 14}} >
                {Object.entries(pages).map(([page, link]) => (
                    <Button
                        component = {NavLink}
                        to={`/${link}`}
                        key={page}
                        sx={{color: '#e4c5af', display: 'block', '&.active': {
                        }}} 
                    >
                        {page}   
                    </Button>
                ))}
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
