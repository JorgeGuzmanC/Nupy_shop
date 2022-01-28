import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { MenuIcon, PencilIcon } from "@toolbox/constants/icons";
import { Button, List,Divider,Drawer,ListItem, ListItemButton, Grid, MenuItem, } from '@mui/material';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
import {ROUTE_HOME , ROUTE_REPORTE, ROUTE_CAJA, ROUTE_PEDIDOS,ROUTE_EDITOR, ROUTE_SALAS, ROUTE_PRODUCTOS, ROUTE_EMPLEADOS} from '@/toolbox/constants/route-map';
import { authenticationService } from '@/service/services/Authentication.service';
import { removeLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_PARMS, KEY_TOOGLE_MENU, KEY_USER_DATA } from '@/toolbox/constants/local-storage';

import { red } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  }));

type Props = {
}
export const DrawerComponent: React.FC<Props> = (
    props: Props
): JSX.Element => {

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [loading, setLoading] = React.useState<any>()

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
      };

   const handleLogout = () => {
      removeLocalStorage(KEY_PARMS);
      removeLocalStorage(KEY_TOOGLE_MENU)
      removeLocalStorage(KEY_USER_DATA);
      localStorage.removeItem('dataUser');
      window.location.replace('/');
    }

    return (
        <Box >
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                transitionDuration={500}
            >
                <List>
                    <ListItem >
                        <IconButton onClick={() => setOpenDrawer(!openDrawer)} >
                            <MenuIcon fill="black"/>
                        </IconButton>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                    <Button color="inherit" component={Link} to={ROUTE_REPORTE}>
                              Reporte
                              </Button>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                    <Button color="inherit" component={Link} to={ROUTE_CAJA}>
                              Caja
                              </Button>
                    </ListItem>

                    
                    <ListItem onClick={() => setOpenDrawer(false)}>
                    <Button color="inherit" component={Link} to={ROUTE_PEDIDOS}>
                              Pedidos
                              </Button>
                    </ListItem>

                    <ListItem onClick={() => setOpenDrawer(false)}>
                    <Button color="inherit" component={Link} to={ROUTE_EDITOR}>
                              Editor
                              </Button>
                    </ListItem>

                    <ListItem onClick={() => setOpenDrawer(false)}>
                    <Button color="inherit" component={Link} to={ROUTE_SALAS}>
                              Salas
                              </Button>
                    </ListItem>

                    <ListItem onClick={() => setOpenDrawer(false)}>
                    <Button color="inherit" component={Link} to={ROUTE_PRODUCTOS}>
                              Productos
                              </Button>
                    </ListItem>

                    <ListItem onClick={() => setOpenDrawer(false)}>
                    <Button color="inherit" component={Link} to={ROUTE_EMPLEADOS}>
                             Empleados
                              </Button>
                    </ListItem>

                  <ListItem onClick={()=>handleLogout()}>
                        <ColorButton variant="contained">

                           salir&nbsp;&nbsp;<LogoutIcon/>

                        </ColorButton>
                    </ListItem>
                </List>
            </Drawer>
            <Grid>
                <IconButton onClick={() => setOpenDrawer(!openDrawer)} >
                    <MenuIcon fill="white"/>
                </IconButton>
            </Grid>
        </Box>
    );
}

