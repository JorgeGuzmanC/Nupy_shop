import { Dialog, Divider, Fab, Grid, Typography } from '@mui/material';
import React, { useState, useEffect, FunctionComponent,useRef } from 'react';
import {  Box,  Button } from '@mui/material';
import { Modal, CircularProgress } from '@mui/material';
import {Props} from './FormHelp.type'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Grow from "@mui/material/Grow";
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export const FormHelp: React.FC<Props> = (
   {open,
    setOpen,
    data,
    setData}
) => {

   const [openCharla, setOpenCharla] = useState(false)

   const style = {
      zindex:'10001',
      transform: 'translate(-85%, -115%)',
      width: 360,
      borderRadius:'20px',
      boxShadow: 5,
      background: '#fff',
      height:'65vh',

    };

    const dataList =[
      {id:0,nombre:'¿Como agendar una notificacion?'},
      {id:1,nombre:'¿Como hacer el autologin?'},
      {id:2,nombre:'¿Como contratar el modulo de CRM?'},
      {id:3,nombre:'¿Donde puedo encontrar mi IK?'},

    ]

    return (
       open&&!openCharla?
         (
         <Grid
           >
               <Box sx={style}>
                   <Grid sx={{bgcolor:'#176ECA', p:3,pb:1,borderTopLeftRadius:'20px'}}>
                   {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom:'10px' }}>
                            <img className="modal-img"  />
                        </div> */}
                     <>
                        <strong style={{fontSize:'1rem',color:'#fff'}}>Necesitas Ayuda?</strong>
                        <p style={{fontSize:'0.8rem',color:'#fff'}}>Bienvenido!</p>
                     </>
                   </Grid>
                   {/* <Box component='form' onSubmit={handleSubmitContact} > */}
                   <Divider style={{width:"100%"}}/>
                   <Grid component='form' container direction="row" spacing={1} sx={{  p:3,pt:2,pb:2 }}>
                           <Grid item xs={12}>
                           <strong style={{fontSize:'1rem'}}>Iniciar una Conversación</strong>
                           </Grid>
                           <Grid item xs={12}>
                           <Button
                           sx={{borderRadius:'15px',textTransform: 'inherit'}}
                           variant='contained'
                           onClick={()=>setOpenCharla(true)}
                           >Charla Nueva</Button>
                           </Grid>
                  </Grid>
                  <Divider style={{width:"100%"}}/>
                  <Grid
                  component='form' container direction='row' spacing={1} sx={{  p:4,pt:3,pb:3 }} >
                     <Grid xs={12}>
                     <strong style={{fontSize:'1rem'}}>Encuentra respuestas rápidas</strong>
                     </Grid>
                     <Grid xs={10}>
                        <Input
                        name='busqueda'
                        placeholder="Busca en nuestro centro de ayuda"
                        fullWidth
                        />
                     </Grid>
                     <Grid>
                        <IconButton sx={{borderRadius:'0px'}}>
                           <SearchIcon color='primary'/>
                        </IconButton>
                     </Grid>
                     <Grid container sx={{mt:2}}>
                     <List sx={{ width: '100%' ,bgcolor: 'background.paper',minHeight:'15vh',maxHeight:'16vh', overflowY:'scroll',borderRadius:'0.5rem', border:'0.5px solid #eff3f5',borderTop: '3px solid #1976D2 '}}>
                        { dataList.map((value,i) => {
                        return (
                           <>
                           <ListItemButton
                              key={i}
                              >
                                 <ListItem alignItems="flex-start"
                                 disablePadding
                                 >
                                    <ListItemText
                                       //secondary={value.nombre}
                                       secondary={
                                          <React.Fragment>
                                          <Typography
                                             sx={{ display: 'inline' }}
                                             component="span"
                                             variant="body2"
                                             color="text.primary"
                                          >
                                             {value.nombre}
                                          </Typography>
                                          </React.Fragment>
                                       }
                                    />
                                 </ListItem>

                              </ListItemButton>
                              <Divider component="li" />
                           </>
                        );
                        })}
                     </List>
                  </Grid>
                  </Grid>
                  <Grid
                  >

                  </Grid>
               </Box>
         </Grid>
         ):(
            open&&openCharla&&
            <Grid
            >
                <Box sx={style}>
                    <Grid container sx={{bgcolor:'#176ECA', p:3,pb:1,borderTopLeftRadius:'20px'}}>
                    {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom:'10px' }}>
                             <img className="modal-img"  />
                         </div> */}

                         //<p onClick={()=>{setOpenCharla(false)}}>Volver</p>
                      <Grid >

                      </Grid>
                         <strong style={{fontSize:'1rem',color:'#fff'}}>Necesitas Ayuda?</strong>
                         <p style={{fontSize:'0.8rem',color:'#fff'}}>Bienvenido!</p>

                    </Grid>
                    {/* <Box component='form' onSubmit={handleSubmitContact} > */}
                    <Divider style={{width:"100%"}}/>
                    <Grid component='form' container direction="row" spacing={1} sx={{  p:3,pt:2,pb:2 }}>
                            <Grid item xs={12}>
                            <strong style={{fontSize:'1rem'}}>Iniciar una Conversación</strong>
                            </Grid>
                            <Grid item xs={12}>
                            <Button
                            sx={{borderRadius:'15px',textTransform: 'inherit'}}
                            variant='contained'
                            onClick={()=>setOpenCharla(true)}
                            >Charla Nueva</Button>
                            </Grid>
                   </Grid>
                   <Divider style={{width:"100%"}}/>
                   <Grid
                   component='form' container direction='row' spacing={1} sx={{  p:4,pt:3,pb:3 }} >
                      <Grid xs={12}>
                      <strong style={{fontSize:'1rem'}}>Encuentra respuestas rápidas</strong>
                      </Grid>
                      <Grid xs={10}>
                         <Input
                         name='busqueda'
                         placeholder="Busca en nuestro centro de ayuda"
                         fullWidth
                         />
                      </Grid>
                      <Grid>
                         <IconButton sx={{borderRadius:'0px'}}>
                            <SearchIcon color='primary'/>
                         </IconButton>
                      </Grid>
                      <Grid container sx={{mt:2}}>
                      <List sx={{ width: '100%' ,bgcolor: 'background.paper',minHeight:'15vh',maxHeight:'16vh', overflowY:'scroll',borderRadius:'0.5rem', border:'0.5px solid #eff3f5',borderTop: '3px solid #1976D2 '}}>
                         { dataList.map((value,i) => {
                         return (
                            <>
                            <ListItemButton
                               key={i}
                               >
                                  <ListItem alignItems="flex-start"
                                  disablePadding
                                  >
                                     <ListItemText
                                        //secondary={value.nombre}
                                        secondary={
                                           <React.Fragment>
                                           <Typography
                                              sx={{ display: 'inline' }}
                                              component="span"
                                              variant="body2"
                                              color="text.primary"
                                           >
                                              {value.nombre}
                                           </Typography>
                                           </React.Fragment>
                                        }
                                     />
                                  </ListItem>

                               </ListItemButton>
                               <Divider component="li" />
                            </>
                         );
                         })}
                      </List>
                   </Grid>
                   </Grid>
                   <Grid
                   >

                   </Grid>
                </Box>
          </Grid>
         )
    )
}
