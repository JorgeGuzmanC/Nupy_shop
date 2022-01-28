import React, { useRef, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { Header } from '@/components/common/Header';

// import { LateralMenu } from '@components/common/LateralMenu';
// import { NavBar } from '@components/common/Navbar';
import { Loading } from "@components/common/Loading";
import { APP_DESKTOP_WIDTH } from '@defaults/app';
import { KEY_TOOGLE_MENU } from '@constants/local-storage';
import { ROUTE_LOGIN } from '@constants/route-map';
import { useLocalStorage } from '@hooks/local-storage.hook';
import { authenticationService } from '@service/services/Authentication.service';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import './Layout.sass';
import { Header } from '@/components/common/Header';
import { Box } from '@mui/system';
import { Button, Fab, Grid } from '@mui/material';
import { FormHelp } from '@/components/common/Form';

interface ProtectedProps {
   className?: string,
   children?: React.ReactNode | React.ReactNode[] | null,
}

let cleanInterval: any;

export const Protected: React.FC<ProtectedProps> = (
   props: ProtectedProps
) : JSX.Element | any => {

   const [openBot, setOpenBot] = useState(false)
   const [toogleMenu, changeMenu] = useLocalStorage<Boolean>(KEY_TOOGLE_MENU, false);
   const [loadData, setLoadData]  = useState<boolean>(false);
   const modalStatus = useRef<any>(null);
   const dataUser    = authenticationService.currentUserValue;
   const authUser    = authenticationService.authCookie();

   const history  = useHistory();
   const location = useLocation();

   const didMount = async () : Promise<void> => {
      //(screen.width < APP_DESKTOP_WIDTH) && changeMenu(false);
      if (!dataUser || !authUser) {
         authenticationService.logout();
         history.replace(ROUTE_LOGIN);
      }
   }
   const didUnmount = async () => {
      clearInterval(cleanInterval);
   }

   const logout = async () => {
      try {
         setLoadData(true);
         const rpta = await authenticationService.logout();
         setLoadData(false);
         if (!!rpta.error) {
            modalStatus.current?.showDialog('error','Error',rpta.error.message);
         } else {
            let it = 2;
            modalStatus.current?.showDialog('success','Exito','Cerrando Sesión ... '+(it+1));
            cleanInterval = setInterval(() => {
               if (it <= 0) {
                  afterClose('success');
               } else {
                  modalStatus.current?.showDialog('success','Exito','Cerrando Sesión ... '+it);
                  it--;
               }
            }, 1000)
         }
      } catch (e) {
         setLoadData(false);
         modalStatus.current?.showDialog('error','Error','Ocurrió problemas al Cerrar Sesión');
      }
   }
   const afterClose = (variant: any) => {
      if (variant === 'success') {
         history.replace(ROUTE_LOGIN);
         clearInterval(cleanInterval);
      }
   }

   useEffect(() => {
      didMount();
      return () => { didUnmount() }
   }, // eslint-disable-next-line
   []);

   return (
      <>
         <div className = "l-protected">
            <div
               className = {"l-protected__bg" + (toogleMenu ? ' --open' : '')}
               onClick = {() => changeMenu(false)}
            />
            {/* <LateralMenu
               location = {location}
               history  = {history}
               openMenu = {toogleMenu}
               loadApp  = {true}
               onToogleMenu = {(a: Boolean) => changeMenu(a)}
            /> */}
            <div className={"l-protected__page "+ props.className} >
               <Header/>
               {/* <Grid
               sx={{position: 'fixed',zIndex:1000, top:{xs:'85vh',md:'80vh'}
               , left: {xs:'80vw',md:'90vw'} }}
               >
                  <Fab color="secondary" aria-label="add"
                                 onClick={()=>{setOpenBot(!openBot)}}
                                 >
                                    <SmartToyIcon />
                  </Fab>
                  <FormHelp
                           open={openBot}
                           setOpen={setOpenBot}
                        />
               </Grid> */}
               <div className="l-protected__main-page">
                  <div className="l-protected__content">
                     {props.children}
                  </div>
               </div>
            </div>
            {/* <SnackDialog ref = {modalStatus} onClose={afterClose}/> */}
            {loadData && <Loading title="Cerrando Sesión" />}
         </div>
      </>
   );
}
