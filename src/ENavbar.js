import React from 'react';
import { AppBar, Toolbar, IconButton, FormControl, InputLabel, Select, MenuItem, styled } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList'; // Imports FilterListIcon from material-ui cons to use as a button icon.
import './ENavbar.css';

const StyledNavbar = styled(AppBar)(() => ({
  backgroundColor: '#B692C2', 
}));

const StyledDropdown = styled(Toolbar)(() => ({
  minHeight: 48, 
})); // It is a styled version of the dropdown component with a minimum height of 48px

const StyledFilterIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5), 
}));

const StyledFilterControl = styled(FormControl)({
  marginLeft: '8px', 
  minWidth: 100,
  backgroundColor: '#ffffff', 
  borderRadius: '8px', 
  '& .MuiInputBase-root': {
    fontSize: '0.875rem', 
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem', 
  },
});

// Custom styled component for the title text
const NavTitle = styled('div')({
  flexGrow: 1,
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#fff',
});

const ENavbar = ({ userfilters, setuserFilters }) => {
  return (
    <div>
       <StyledNavbar position="static">
        <StyledDropdown>
          <NavTitle>
            Employee
          </NavTitle>
          <StyledFilterIconButton color="inherit">
            <FilterListIcon fontSize="small" />
          </StyledFilterIconButton>
          <StyledFilterControl variant="outlined" size="small">
            <InputLabel>Country</InputLabel>
            <Select
              value={userfilters.country}
              onChange={(e) => setuserFilters({ ...userfilters, country: e.target.value })}
              label="Country"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="United States">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
             
            </Select>
          </StyledFilterControl>
          <StyledFilterControl variant="outlined" size="small">
            <InputLabel>Gender</InputLabel>
            <Select
              value={userfilters.gender}
              onChange={(e) => setuserFilters({ ...userfilters, gender: e.target.value })}
              label="Gender"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </StyledFilterControl>
        </StyledDropdown>
      </StyledNavbar>
    </div>
  );
}

export default ENavbar;
