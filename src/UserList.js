import React, { useEffect, useState } from 'react';//importing React and its hooks
import axios from 'axios';//for fetching the api 
import InfiniteScroll from 'react-infinite-scroll-component';//for infinite scroll
import {  Container,Typography, Box, CircularProgress} from '@mui/material';//for styling and structuring the UI
import { styled } from '@mui/material/styles';//for creating styled components with custom styles.
import ENavbar from './ENavbar'; // import the Navbar component
import Nav from './Nav';//import the header
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';//it is a UI kit based on bootstrap and material design
import './UserList.css'; //import the css file

const UserListContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));// here i create a new component called UserListContainer that is based on the Container component.
    // it is creating a styled component using Material-UI's styled function. 

const LoadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: theme.spacing(2),
}));//This allows us to have a consistent and reusable styled component that adheres to your application's theme settings

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));//it defines an asynchronous delay function that pauses execution for a specified amount of time before resolving

const UserList = () => {
  const [users, setUsers] = useState([]);//usersis a variable holds the array of user objects fetched from an API and setUsers is a  function which updates the users state
  const [hasMoreuser, setHasMoreuser] = useState(true);//this is useful for pagination or infinite scroll and setHasMoreusser updates the hasMoreuser state
  const [skip, setSkip] = useState(0);//it keeps track of the number of users to skip when fetching data and setSkip updates the skip state
  const [sortoption, setSortoption] = useState({ key: 'id', direction: 'asc' });//it holds the configuration for sorting, including the key like id, fullName and the direction like asc, desc and setSortoption the sortConfig state
  const [userfilters, setuserFilters] = useState({ gender: '', country: '' });//it holds the current filter settings for user data, such as gender and country and setuserFilters updates the filters state
  //all are define state variables for a react functional component using the useState hook
  
  useEffect(() => {
    fetchUsers();//it is used to fetch user data from an api
  }, [skip]);

  const fetchUsers = async () => {
    try {
      // Delay the request by 1 second
      await delay(1000);

      //fetching the api 
      const response = await axios.get('https://dummyjson.com/users', {
        params: { limit: 10, skip },//it sends query parameters to the api limit controls how many users to fetch and skip controls the starting point for pagination
      });
      setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
      setSkip(prevSkip => prevSkip + 10);
      if (response.data.users.length < 10) {
        setHasMoreuser(false);
      }//it updates the state to indicate that there are no more users to fetch if the number of users returned is less than the requested limit (10)
    } catch (error) {
      console.error('Error fetching users:', error);
    }// it is for error handling
  };

  const handleSort = (key) => {//The handleSort function toggles the sorting direction for a specified column in a table. 
    let direction = 'asc';
    if (sortoption.key === key && sortoption.direction === 'asc') {
      direction = 'desc';
    }
    setSortoption({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortoption.key === 'fullName') {
      const nameA = `${a.firstName} ${a.maidenName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.maidenName} ${b.lastName}`.toLowerCase();
      if (nameA < nameB) {
        return sortoption.direction === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortoption.direction === 'asc' ? 1 : -1;
      }
      return 0;
    } else {
      if (a[sortoption.key] < b[sortoption.key]) {
        return sortoption.direction === 'asc' ? -1 : 1;
      }
      if (a[sortoption.key] > b[sortoption.key]) {
        return sortoption.direction === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });//The sortedUsers variable creates a new array of users sorted based on the sortoption.it sorts users either by a concatenated full name or by a specific field, adjusting the order based on the current sort direction like asc or desc

  const filteredUsers = sortedUsers.filter((user) => {
    return (
      (!userfilters.country || user.address?.country === userfilters.country) &&
      (!userfilters.gender || user.gender === userfilters.gender)
    );
  });//here filteredUsers array contains users from sortedUsers who match the current filter criteria for country and gender. It includes users only if their address country and gender match the specified filters or if no filter is applied for these fields
  
  const getSortIcon = (key) => {
    if (sortoption.key === key) {
      return sortoption.direction === 'asc'
        ? <i className="fas fa-sort-up sort-icon"></i>
        : <i className="fas fa-sort-down sort-icon"></i>;
    }
    return <i className="fas fa-sort sort-icon"></i>;
  };//The getSortIcon function returns an icon indicating the sort direction based on the current sorting configuration

  return (
    <>
      <Nav /> 
      <ENavbar userfilters={userfilters} setuserFilters={setuserFilters} />
      <UserListContainer>
        {filteredUsers.length === 0 ? (//it is a conditional rendering that checks if there are no users to display
          <Typography variant="h6">There are no users related to this country.</Typography>
        ) : (
          <InfiniteScroll// it handles infinite scrolling behavior
            dataLength={filteredUsers.length}//specifies the number of items currently loaded
            next={fetchUsers} //it is a function that loads more users when needed
            hasMoreuser={hasMoreuser}//it is a boolean that indicates if there are more users to load
            loader={
              <LoadContainer>
                <CircularProgress /> Loading...
              </LoadContainer>
            }
          >
            <MDBTable hover>
              <MDBTableHead light>
                <tr>
                  <th scope='col' onClick={() => handleSort('id')} className="sortable">
                    ID {getSortIcon('id')}
                  </th>
                  <th scope='col'>Image</th>
                  <th scope='col' onClick={() => handleSort('fullName')} className="sortable">
                    Full Name {getSortIcon('fullName')}
                  </th>
                  <th scope='col' onClick={() => handleSort('age')} className="sortable">
                    Demography {getSortIcon('age')}
                  </th>
                  <th scope='col'>Designation</th>
                  <th scope='col'>Location</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                    <img src={user.image} alt={`${user.firstName} ${user.lastName}`} 
                     style={{ width: '40px', height: '40px', borderRadius: '40%' }} />
                        </td>
                    <td>{`${user.firstName} ${user.maidenName} ${user.lastName}`}</td>
                    <td>{`${user.age}, ${user.gender.charAt(0).toUpperCase()}`}</td>
                    <td>{user.company?.title || 'not applicable'}</td>
                    <td>{`${user.address?.state || 'not applicable'}, ${user.address?.country || 'not applicable'}`}</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </InfiniteScroll>
        )}
      </UserListContainer>
    </>
  );
};

export default UserList;
