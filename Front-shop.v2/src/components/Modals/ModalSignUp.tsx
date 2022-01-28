
//////////////SAPPPPE//////////////SAPPPPE//////////////SAPPPPE//////////////SAPPPPE//////////////SAPPPPE//////////////SAPPPPE
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { Divider, Grid } from '@mui/material';
import { Grid, TextField, Divider, Autocomplete, Dialog, DialogTitle, Modal, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Paper, Box, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
import DialogContent from "@mui/material/DialogContent";
import { CancelIcon, SaveIcon } from "@toolbox/constants/icons";
// import './Modal.sass'
// import { ConfirmDialog } from '../DialogConfirm';
// import { indigo } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import '../../styles/nupy-app.css'
import { Login } from '@/views/Login';
import { Props } from "./ModalSignUp.type";
import { authenticationService } from '@/service/services/Authentication.service';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import img from "@assets/img/vacio.png";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ImgLoyverse01 from "@assets/img/ImgLoyverse01.png";
import Img01 from "@assets/img/img1.png";
import Img02 from "@assets/img/img2.png";
import Img03 from "@assets/img/img3.png";
import Img04 from "@assets/img/img4.png";
import ImgLoyverse02 from "@assets/img/ImgLoyverse02.png";
import ImgLoyverse03 from "@assets/img/ImgLoyverse03.png";
import ImgLoyverse04 from "@assets/img/ImgLoyverse04.png";
import { doopyService } from '@/service/services/Doopy.service';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
   {
      label: 'img01',
      imgPath:Img01
   },
   {
      label: 'img02',
      imgPath:Img02
   },
   {
      label: 'img03',
      imgPath:Img03
   },
   {
      label: 'img04',
      imgPath:Img04
   },
];


const TypeUsers = [
   { id: 1, title: 'Administrador' },
   { id: 2, title: 'Usuario Estandar' }
 ];

export const ModalSignUp: React.FC<Props> = ({
   open,
   setOpen,
   data,
   setData
}): JSX.Element => {
   const { username, rut, password } = data;
   const paramsDoopy ={
      rut: rut,
      nick: username,
      password: password
   }
   const [error, setError] = useState(null);
   const [dataR, setDataR] = useState<any>();
   const [openSlice, setOpenSlice] = useState<boolean>(false);
   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })
   useEffect(() => {
      setDataR(paramsDoopy)
   }, [data])

   const [openCombo, setOpenCombo] = useState(false);
   // metodos para abrir el combobox
   const handleClose = () => {
      setOpenCombo(false);
   };

   const handleOpen = () => {
      setOpenCombo(true);
   };


   //slider
   const theme = useTheme();
   const [activeStep, setActiveStep] = useState(0);
   const maxSteps = images.length;

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleStepChange = (step: number) => {
      setActiveStep(step);
   };
   const handleInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      if (name === 'idtipo') {
         setDataR(prev => ({ ...prev, idtipo: value }));
      }
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(dataR)

      const resp = await doopyService.registerDoopy(dataR)
      console.log(resp)

      if (resp.resp.acceso=='false') {
         setOpen(false);
         setSnackBarConfig(prev => ({
            ...prev,
            open: true,
            message: resp.resp.descripcion,
         }));
      }
      else {

            setSnackBarConfig(prev => ({
               ...prev,
               open: true,
               severity: 'info',
               message: 'Cuenta Creada  Exitosamente',
            }));

      }

      setOpen(false)

   }

   return (
      <div>
         <Dialog
            open={open}
            maxWidth={'xs'}
         >
            <Box sx={{ background: '#F5F5F5'}}>
               <div className="modal-header">
                  <PersonIcon />
                  <Typography style={{ fontSize: "18px", marginLeft: "5px" }}>Regístrate</Typography>
               </div>
               <form onSubmit={handleSubmit}>
                  <DialogContent className="modal-body">
                     <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center">
                        <Grid xs={12}>
                           <Typography className='modal-tittle' style={{ marginTop: "1vh" }}>Ingrese su Tipo de Usuario</Typography>
                        </Grid>
                        <Grid xs={8} md={11}>
                           <FormControl fullWidth>
                              <InputLabel id="typeuser-label">Tipo Usuario</InputLabel>
                              <Select
                                 labelId="typeuser-label"
                                 id="idtipo"
                                 open={openCombo}
                                 fullWidth
                                 size='small'
                                 sx={{bgcolor:'#fff'}}
                                 error={error === "idtipo" ? true : false}
                                 onClose={handleClose}
                                 onOpen={handleOpen}
                                 name="idtipo"

                                 label="Tipo-Usuario"
                                 onChange={handleInputChange}
                              >
                                 {TypeUsers.map((option, i) => {
                                 return <MenuItem key={i} value={option.id}>{option.title}</MenuItem>
                                 })
                                 }
                              </Select>
                           </FormControl>

                        </Grid>
                        <Grid sx={{ mt: 3, ml: 1 }}>
                           {/* <HelpOutlineIcon color={openSlice ? 'success' : 'info'} onClick={() => { setOpenSlice(true) }} /> */}
                        </Grid>

                     </Grid>

                  </DialogContent>
                  <Divider style={{ marginBottom: "2vh" }} />
                  <Grid  container direction='row' spacing={2} sx={{ mt: 0, mb: 1 }} justifyContent='flex-end' alignContent='center' >
                     <Button type={"button"}sx={{borderRadius:'15px'}} onClick={() => { setOpen(false) }}  size="small" >
                     <span style={{ color: "gray" }}>Cancelar</span>
                     </Button>
                     <Grid xs={1} />
                     <Button sx={{mr:2,borderRadius:'15px',backgroundColor: "#fd6c1d",}}variant="contained" size="small" type='submit'>
                        Registrar
                     </Button>
                  </Grid>
               </form>
            </Box>

         </Dialog>

         <Dialog
            open={openSlice}
            onClose={() => { setOpenSlice(false) }}
         >
            <DialogContent className="modal-body">
               <Box sx={{ maxWidth: 700, flexGrow: 1}}>
                  <AutoPlaySwipeableViews
                     axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                     index={activeStep}
                     onChangeIndex={handleStepChange}
                     enableMouseEvents
                  >
                     {images.map((step, index) => (
                        <div key={step.label}>
                           {Math.abs(activeStep - index) <= 2 ? (
                              <Box
                                 component="img"
                                 sx={{
                                    height: 460,
                                    display: 'block',
                                    overflow: 'hidden',
                                    width: 1000,
                                 }}
                                 src={step.imgPath}
                                 alt={step.label}
                              />
                           ) : null}
                        </div>
                     ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                     steps={maxSteps}
                     position="static"
                     activeStep={activeStep}
                     nextButton={
                        <Button
                           size="small"
                           onClick={handleNext}
                           disabled={activeStep === maxSteps - 1}
                        >
                           Siguiente
                           {theme.direction === 'rtl' ? (
                              <KeyboardArrowLeft />
                           ) : (
                              <KeyboardArrowRight />
                           )}
                        </Button>
                     }
                     backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                           {theme.direction === 'rtl' ? (
                              <KeyboardArrowRight />
                           ) : (
                              <KeyboardArrowLeft />
                           )}
                           Atrás
                        </Button>
                     }
                  />
               </Box>
            </DialogContent>
         </Dialog>
         <Snackbar
            open={snackBarConfig.open}
            autoHideDuration={snackBarConfig.autoHideDuration}
            onClose={() => setSnackBarConfig(prev => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         >
            <Alert
               onClose={() => setSnackBarConfig(prev => ({ ...prev, open: false }))}
               severity={snackBarConfig.severity}
               variant="filled"
            >
               {snackBarConfig.message}
            </Alert>
         </Snackbar>
      </div>

   );
}
