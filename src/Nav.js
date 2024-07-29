import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Pixel6Logo from './pixel6-logo.png'; //  path for logo
import './Nav.css';//importing css for this header

const Nav = (props) => {//it accepts props as an argument.
  const [sidebarOpen, setsidebarOpen] = useState(false);//this state typically controls whether a  sidebar is open or closed

  const handleSidebarToggle = (open) => (event) => {//the open parameter determines whether the sidebar should be opened  or closed 
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setsidebarOpen(open);
  };

  const sidebar = (
    <div
      role="presentation"
      onClick={handleSidebarToggle(false)}
      onKeyDown={handleSidebarToggle(false)}
    >
      <List>
        <ListItem>
          <ListItemText primary="Pixel6 Web Studio Pvt. Ltd." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Baner, Pune 411045" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );//in this it creates a sidebar with two list items displaying company information
    

  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <div className="logo-container">
          <img src={Pixel6Logo} alt="Pixel6 Logo" className="logo" />
        </div>
        
        <IconButton edge="end" color="inherit" onClick={handleSidebarToggle(true)} className="menu-button">
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={sidebarOpen} onClose={handleSidebarToggle(false)}>
          {sidebar}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
