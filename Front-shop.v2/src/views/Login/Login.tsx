import React, { FunctionComponent, useMemo, useEffect, useRef, useState } from "react";
import { Button, InputAdornment, IconButton, Grid, CircularProgress, useTheme ,Snackbar, Alert, FormControl, TextField, Typography, useMediaQuery, Collapse, Fab } from '@mui/material';

import { VALIDATORS } from '@toolbox/helpers/validation-rules';
import { Icon } from '@components/common/Icon';
import { Input } from '@components/common/Input';
import { InputRef } from '@components/common/Input/InputInterfaces';
import { Loading } from "@components/common/Loading";
import AddIcon from '@mui/icons-material/Add';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "@assets/img/logo-softnet.png";
import { VisibilityIcon, VisibilityOffIcon } from '@toolbox/constants/icons';
import * as qs from 'qs'
import { ROUTE_GENERATOR_TICKET, ROUTE_HOME } from "@/toolbox/constants/route-map";
// import  logo from "@assets/svg/s-c-g-logo.svg";
import  Logo from "@assets/img/nupy-logo.png";
import { authenticationService } from '@service/services/Authentication.service';
import { useHistory } from 'react-router-dom'

import "./Login.sass";
import "./login-styles.css"
import { makeStyles, withStyles } from "@mui/styles";
import { ModalSignUp } from "@/components/Modals/ModalSignUp";

import { ModalBuyNow } from "@/components/Modals/ModalBuyNow";
import { ModalConsult } from "@/components/Modals/ModalConsult";
import { doopyService } from "@/service/services/Doopy.service";
import { KEY_RUT, KEY_TIPO_ROL } from "@/toolbox/constants/local-storage";
import { saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";

const theme = createTheme();
export const Login: React.FC<any> = (props): JSX.Element => {
   const history = useHistory();
   const inputRefs = useRef<Array<InputRef | null>>([]);
   const [loadData, setLoadData] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [open, setOpen] = useState(false);

   const [showModalSignUp, setModalSignUp] = React.useState(false);
   const[showModalConsult, setModalConsult]=React.useState(false);
   const[showModalBuyNow, setModalBuyNow]=React.useState(false);

   const [data, setData] = useState({
      username: '',
      rut: '',
      password: '',
      textError: '',
      showPassword: false
   });

   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })

   const { rut, usuario, password } = props.location && qs.parse(props.location.search.slice(1, -1));
   useEffect(() => {
      if (rut && usuario && password) {
         var decodeRutEmpresa;
         var decodeUser;
         var decodePassword;

         try {
            decodeRutEmpresa = atob(rut);
            decodeUser = atob(usuario);
            decodePassword = btoa(password);
            authSubmit(decodeUser, decodeRutEmpresa, decodePassword);
         } catch (error) {
         }
      } else {
      }
   }, []);
   const CssTextField = withStyles({
      root: {
         '& .MuiInput-underline:after': {
            // borderBottomColor: pColor,
         },
         '& .MuiOutlinedInput-root': {
            '& fieldset': {
               borderColor: 'black',
            },
            '&:hover fieldset': {
               borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
               // borderColor: pColor,
               borderColor: '#6f6877',
            },
         },
      },
   })(TextField);
   const useStyles = makeStyles((theme) => ({
      styleImage: {
         width:'400px',
         marginTop:'-20px',
         color:'#f00'
       },
       loginText: {
         fontSize: "26px",
         fontWeight: "bolder"
       }
   }));
   const useStylessm = makeStyles((theme) => ({
      styleImage: {
         width:'80%',
         marginTop:'10vh',
         marginLeft:'10%',
         color:'#f00'
       },
       loginText: {
         fontSize: "26px",
         fontWeight: "bolder"
       }
   }));

   const classes = useStyles();
   const classessm = useStylessm();

   const rules = useMemo(() => ({
      username: [
         VALIDATORS.REQUIRED
      ],
      password: [
         VALIDATORS.REQUIRED,
      ],
      rut: [
         VALIDATORS.REQUIRED,
         VALIDATORS.ONLY_LOWERCASE,
      ]
   }), []);

   const validate = () => {
      const refs = inputRefs.current;
      const valid = refs.reduce((prev, ref) => {
         const isValid = ref && ref.validate(true) || false
         return prev && isValid;
      }, true);

      return valid;
   }

   const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;

      switch (name) {
         case 'username':
            // if ((/^[\w@.-]{0,86}$/).test(value)) {
            // }
            setData(prev => ({ ...prev, username: value, textError: '' }));
            break;
         case 'password':
            // if (/^.{0,15}$/.test(value)) {
            // }
            setData(prev => ({ ...prev, password: value, textError: '' }));
            break;
         case 'rut':
            var Fn = {
               // Valida el rut con su cadena completa "XXXXXXXX-X"
               validaRut : function (rutCompleto) {
                  if (!/^[0-9]+[-|???]{1}[0-9kK]{1}$/.test( rutCompleto ))
                     return false;
                  var tmp 	= rutCompleto.split('-');
                  var digv	= tmp[1];
                  var rut 	= tmp[0];
                  if ( digv == 'K' ) digv = 'k' ;
                  return (Fn.dv(rut) == digv );
               },
               dv : function(T){
                  var M=0,S=1;
                  for(;T;T=Math.floor(T/10))
                     S=(S+T%10*(9-M++%6))%11;
                  return S?S-1:'k';
               }
            }

            var foo =value.split("-").join("")
            if(foo.length >0 && foo.length<10){
               foo= foo.match(new RegExp('.{1,8}', 'g')).join("-");
               setData(prev => ({ ...prev, rut: foo, textError: '' }))
            }else if(foo.length == 0){
               setData(prev => ({ ...prev, rut: '', textError: '' }))
            }
            break;
         default:
            break;
      }
   };

   const handleInputBlur = (event: any) => {
      const newVal = (event.target.value).trim();
      const name = event.target.name;
      setData(prev => ({ ...prev, [name]: newVal }));
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const { username, rut, password } = data;
      try {
         if (validate()) {
            authSubmit( username,rut,password);
         }
      } catch (error) {
         setData(prev => ({ ...prev, textError: 'Lo sentimos, ocurri?? un error inesperado.' }));
      } finally {
        // setLoading(false);
      }
   }

   const authSubmit = async (username, rut, password) => {
      setLoading(true);
      const response:any = await authenticationService.login(username, rut, password);
      console.log(response.data?.access_token)

      if (response.data?.access_token === '') {

         setSnackBarConfig(prev => ({
            ...prev,
            open: true,
            message: "Acceso no autorizado",
         }));
         setLoading(false);
      }

      else{
         console.log('hola')
         history.push(ROUTE_HOME)
      }
   }

   const validationRegistrer = async() => {
      const { username, rut, password } = data;
      if (validate()) {

         setLoadData(true)
         const response = await authenticationService.loginFake(username, password,rut);

         if (response?.token === undefined) {
            setSnackBarConfig(prev => ({
               ...prev,
               open: true,
               severity: 'warning',
               message: "Acceso no autorizado",
            }));
           // sendModalSignUp();
         }
         else{

            const paramsDoopy ={
               rut: rut,
               nick: username,
               password: password
            }
            const loginIp = await doopyService.loginDoopy(paramsDoopy);

            if(loginIp.resp.acceso=='true'){

                     setSnackBarConfig(prev => ({
                        ...prev,
                        open: true,
                        severity: 'warning',
                        message: "Usuario ya registrado, Inicie Sesi??n",
                     }));

               }else{

               sendModalSignUp();

            }

         }
         setLoadData(false)
      }
   }
   const sendModalSignUp=()=>{
      setModalSignUp(!showModalSignUp);
   }
   const sendModalConsult=()=>{
      setModalConsult(!showModalConsult);
   }
   const sendModalBuyNow=()=>{
      setModalBuyNow(!showModalBuyNow);
   }
   const handleClickShowPassword = () => {
      setData({ ...data, showPassword: !data.showPassword });
   };

   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

   const formulario=(
      <form >
         <div className="up-desing"></div>
         <div style={{padding: "20px"}}>
            <Grid container spacing={2} >
               <Grid item xs={12}>
                  <h1 className ="textTittle">SESI??N DE USUARIO</h1>
                  <Input
                     ref={ref => inputRefs.current[0] = ref}
                     name="username"
                     placeholder="Ingrese su nombre de Usuario"
                     value={data.username}
                     onChange={handleInput}
                     onBlur={handleInputBlur}
                     backgroundColor="#ffffff"
                     rules={rules.username}
                     disableElevation
                     validateOnBlur
                     dense
                  />

               </Grid>
               <Grid item xs={12}>

                  <Input
                     ref={ref => inputRefs.current[1] = ref}
                     name="rut"
                     type="text"
                     placeholder="Rut Empresa"
                     value={data.rut}
                     onChange={handleInput}
                     onBlur={handleInputBlur}
                     backgroundColor="#ffffff"
                     rules={rules.rut}
                     disableElevation
                     validateOnBlur
                     dense
                  />

               </Grid>
               <Grid item xs={12}>
                  <Input

                     ref={ref => inputRefs.current[2] = ref}
                     name="password"
                     type={data.showPassword ? 'text' : 'password'}
                     placeholder="Ingrese la contrase??a"
                     value={data.password}
                     onChange={handleInput}
                     onBlur={handleInputBlur}
                     backgroundColor="#ffffff"
                     rules={rules.password}
                     appendAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                           >
                              {data.showPassword ? <Icon Svg={VisibilityIcon} /> : <Icon Svg={VisibilityOffIcon} />}
                           </IconButton>
                        </InputAdornment>
                     }
                     disableElevation
                     validateOnBlur
                     dense
                  />
               </Grid>
               <Grid item xs={12}>
                  <Button
                     className="buttonLogin"
                  style={{
                     backgroundColor: "#0c879c",
                     fontFamily: "Roboto Condensed",

                     }}
                     fullWidth={true}
                     type='submit'
                     variant='contained'
                     onClick={handleSubmit}
                     disabled={loading}
                     disableElevation
                     // sx={{borderRadius:'15px'}}
                  >
                     {
                        loading ?
                           <CircularProgress className="CircularProgress" size={24} /> :
                           <span>Iniciar sesi??n</span>
                     }
                  </Button>
               </Grid>
               <Grid item xs={12}>
                  <Button
                     className="buttonRegister"
                     style={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        border: "1px solid #0c879c",
                        fontFamily: "Roboto Condensed",
                  }}

                     fullWidth={true}
                     // type='submit'
                     variant='contained'
                     onClick={()=>validationRegistrer()}
                     disabled={loading}
                     disableElevation
                     // sx={{borderRadius:'15px'}}
                  >
                     Reg??strate
                  </Button>
               </Grid>
            </Grid>
         </div>
   </form>
   )

   return (
      <>
         <ThemeProvider theme={theme}>
         <Snackbar
                     open={snackBarConfig.open}
                     autoHideDuration={snackBarConfig.autoHideDuration}
                     onClose={() => setSnackBarConfig(prev => ({ ...prev, open: false }))}
                     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                     <Alert
                        onClose={() => setSnackBarConfig(prev => ({ ...prev, open: false }))}
                        severity={snackBarConfig.severity}
                        variant="filled"
                     >
                        {snackBarConfig.message}
                     </Alert>
                  </Snackbar>
            <Grid container component="main" className="App-login" sx={{ height: '100vh' }}>
               <CssBaseline />
               {
                  isMobile?(
                     <>
                     <Grid item xs={12}>
                     {/* <img src={Logo} className={classessm.styleImage} /> */}
                     <div style={{ marginTop: "10vh" }} >
                           <Typography style={{ fontWeight: 900, color: '#1976D2', fontSize: '80px', fontStyle: 'italic' , textAlign:"center"}} variant="h1">Nupy</Typography>
                        </div>
                     </Grid>
                     <Grid item xs={1} ></Grid>
                     <Grid item xs={10} style={{ textAlign: "left", justifyContent: "center", alignItems: "center"}}>
                        <Paper elevation={2} >
                           {formulario}
                        </Paper>
                     </Grid>
                     {/* <Grid container
                           direction="row"
                           justifyContent="center"
                           alignItems="center"
                           >
                           <Grid >
                           <Button
                              style={{
                                 backgroundColor: "#0c879c",
                              }}
                              variant="contained"
                              sx={{borderRadius:'8px'}}
                              fullWidth={true}

                              onClick={() => sendModalConsult()}
                              disabled={loading}
                              disableElevation>
                              Consultar
                           </Button>
                           </Grid>
                           <Grid xs={1}></Grid>
                           <Grid >
                           <Button
                              style={{
                              backgroundColor: "#e4980d",
                              }}
                              variant="contained"
                              sx={{borderRadius:'8px'}}
                              fullWidth={true}

                              onClick={() => sendModalBuyNow()}
                              disabled={loading}
                              disableElevation>??lo quiero!
                           </Button>
                           </Grid>
                        </Grid> */}
                     </>
                  ):(
                  <Grid container className="all-heigth" style={{ height: "100%",textAlign: "left", justifyContent: "center", alignItems: "center" }}>
                  <Grid  item md={2} />
                  <Grid item xs={12} md={4} className="login-logo">
                     {/* <img src={Logo} className={classes.image} /> */}

                        {/* <img src={Logo} className={classes.styleImage} /> */}
                        <div style={{ marginTop: "-30px" }} >
                           <Typography style={{ fontWeight: 900, color: '#1976D2', fontSize: '150px', fontStyle: 'italic' }} variant="h1">Nupy</Typography>
                        </div>

                        <p className="textInformation">
                        Hecho para la gestionar tu punto de venta de manera f??cil y r??pida
                                           </p>
                        {/* <div>
                           <Button
                              className="button-loginConsult"
                              style={{
                                 backgroundColor: "#0c879c",
                                 fontFamily: "Roboto Condensed",
                              }}
                              variant="contained"
                              onClick={() => sendModalConsult()}
                              disabled={loading}
                              disableElevation>
                              Consultar
                           </Button>
                           {"  "}
                           <Button
                              className="button-loginWant"
                              style={{
                                 backgroundColor: "#e4980d",
                                 fontFamily: "Roboto Condensed",
                              }}
                              variant="contained"
                              color="secondary"
                              onClick={() => sendModalBuyNow()}
                              disabled={loading}
                              disableElevation>??lo quiero!
                           </Button>
                        </div> */}
                  </Grid>
                  <Grid item md={1} />

                  <Grid container item xs={12} md={3} style={{ textAlign: "left", justifyContent: "center", alignItems: "center" }}>
                     <Paper elevation={3} >
                        {formulario}
                  </Paper>

                    </Grid>
                    <Grid className="md-show" item md={2} />


               </Grid>
                  )
               }
             <ModalSignUp
               open={showModalSignUp}
               setOpen={setModalSignUp}
               data = {data}
               setData= {setData}
               // handleClose={handleClose}
            />
            <ModalConsult
               open={showModalConsult}
               setOpen={setModalConsult}
               handleSubmit={handleSubmit}
               loading={loading}
            />
            {/* Modal  "ADQUIRIR AHORA"*/}
            <ModalBuyNow
               open={showModalBuyNow}
               setOpen={setModalBuyNow}
               handleSubmit={handleSubmit}
               loading={loading}
            />
            </Grid>

         </ThemeProvider>

      </>
   )
}

