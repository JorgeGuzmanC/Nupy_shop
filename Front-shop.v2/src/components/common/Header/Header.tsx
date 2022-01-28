import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {  Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
import { ROUTE_HOME , ROUTE_REPORTE, ROUTE_CAJA, ROUTE_PEDIDOS, ROUTE_SALAS, ROUTE_PRODUCTOS, ROUTE_EMPLEADOS, ROUTE_EDITOR} from '@/toolbox/constants/route-map';
import { DrawerComponent } from './Drawer';
import { readLocalStorage, removeLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_PARMS, KEY_TOOGLE_MENU, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { authenticationService } from '@/service/services/Authentication.service';

type Props = {
}

export const Header: React.FC<Props> = (
   props: Props
): JSX.Element => {
   const history= useHistory();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const isMenuOpen = Boolean(anchorEl);

   const [loading, setLoading] = useState<any>()

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleMenuClose = () => {
      setAnchorEl(null);
   };


   const renderMenu = (
      <Menu
         id="fade-menu"
         MenuListProps={{
            'aria-labelledby': 'fade-button',
         }}
         anchorEl={anchorEl}
         open={isMenuOpen}
         onClose={handleMenuClose}
         TransitionComponent={Fade}
      >
         <MenuItem onClick={handleMenuClose} component={Link} to={ROUTE_SALAS}>Salas</MenuItem>
         <MenuItem onClick={handleMenuClose} component={Link} to={ROUTE_PRODUCTOS}>Productos</MenuItem>
         <MenuItem onClick={handleMenuClose} component={Link} to={ROUTE_EMPLEADOS}>Empleados</MenuItem>
         
         <MenuItem onClick={()=>handleLogout()} component={Link} to={ROUTE_EMPLEADOS}>Cerrar Sesión</MenuItem>
      </Menu>
   );

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

   const handleLogout = () => {
     removeLocalStorage(KEY_PARMS);
     removeLocalStorage(KEY_TOOGLE_MENU)
     removeLocalStorage(KEY_USER_DATA);
     localStorage.removeItem('dataUser');
     window.location.replace('/');
   }
   return (
      <div>
         <Box sx={{ flexGrow: 1, padding: 4 }}>
            <AppBar>
               <Toolbar sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', bgcolor:'#176ECA' }}>
                  <Grid>
                     <Button color="inherit" component={Link} to={ROUTE_HOME}>
                        <Typography
                           variant="h6"
                           noWrap
                           component="div"
                           sx={{ display: { xs: 'block', sm: 'block' } }}
                        >
                           NUPY SISTEMA POS
                        </Typography>
                     </Button>
                  </Grid>
                  {
                     isMobile ? (
                        <DrawerComponent />
                     ) : (
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }} >
                           <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                              <Button  variant='contained' sx={{bgcolor:'#f7ac33',ml:1}} component={Link} to={ROUTE_REPORTE}>
                              Reporte
                              </Button>
                              <Button variant='contained'  sx={{bgcolor:'#00a152',ml:1}} component={Link} to={ROUTE_CAJA}>
                              Caja
                              </Button>
                              
                              <Button variant='contained'  sx={{bgcolor:'#9500ae',ml:1}} component={Link} to={ROUTE_PEDIDOS}>
                              Pedidos
                              </Button>
                              <Button variant='contained'  sx={{bgcolor:'red',ml:1}} component={Link} to={ROUTE_EDITOR}>
                              Editor
                              </Button>
                              <Button color='inherit' onClick={handleProfileMenuOpen}>
                              Mi cuenta
                              </Button>
                              {/* <Button  color="inherit" onClick={()=>handleLogout()}>
                              Cerrar Sesion
                              </Button> */}
                           </Box>
                        </Box>
                     )
                  }
               </Toolbar>
            </AppBar>
            {renderMenu}
         </Box>
      </div>
   );
}
