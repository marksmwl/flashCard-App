import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';


export default function ButtonAppBar() {

  return (
    <Box>
      <AppBar>
        <Toolbar className='header'>
         
            <Link to={'/home'}>
              <h1 className='header-text'>Home</h1>
            </Link>
            
            <Link to={'/cards'}>
              <h1 className='header-text'>View Your Cards</h1>
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
