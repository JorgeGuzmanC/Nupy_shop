import React, { useEffect, useState,  useRef, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import { Grid,  Divider,  Modal, CircularProgress, TextField, InputBase, Alert } from '@mui/material';
import {  Box,  Button } from '@mui/material';
import '../../styles/nupy-app.css'
import { Input } from '@components/common/Input';
import { InputRef } from '@components/common/Input/InputInterfaces';
import imagen from '@assets/img/nupy-logo.png';
import { Props } from "./ModalBuyNow.type";
import { baypassService } from '@/service/services/Baypass.service';
import { RuleTwoTone } from '@mui/icons-material';
import { VALIDATORS } from '@/toolbox/helpers/validation-rules';


export const ModalBuyNow:React.FC<Props> = ({
    open,
    setOpen,
    //handleSubmit,
    //loading
 }): JSX.Element => {
    const dataInitial={
      RUT: '',
      telefono: '',
      correo: '',
      pagina:'loyverse'
  }
  const inputRefs = useRef<Array<InputRef | null>>([]);

   const [error, setError] = useState(null);
   const [data, setData] = useState(dataInitial);
   const {RUT, telefono, correo, pagina} = data

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        borderRadius:'20px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        background: '#F5F5F5'
      };

      const rules = useMemo(() => ({
         RUT: [
            VALIDATORS.REQUIRED
         ],
         correo: [
            VALIDATORS.REQUIRED,
         ],
         telefono: [
            VALIDATORS.REQUIRED,
         ]
      }), []);

      const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
         const name = event.target.name;
         const value = event.target.value;

         switch (name) {
            case 'correo':
               if (/^[\w-][\w.-]{2,60}[\w-]@[\w-]{3,20}(\.[a-z-A-Z]{2,3}){1,2}$/.test(value)){
                  console.log('correo')
               }
               setData(prev => ({ ...prev, correo: value, textError: 'El correo ingresado es incorrecto' }));
               break;
            case 'telefono':
               // if (/^.{0,15}$/.test(value)) {
               // }
               setData(prev => ({ ...prev, telefono: value, textError: '' }));
               break;
            case 'RUT':
               var Fn = {
                  // Valida el rut con su cadena completa "XXXXXXXX-X"
                  validaRut : function (rutCompleto) {
                     if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
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
                  setData(prev => ({ ...prev, RUT: foo, textError: '' }))
               }else if(foo.length == 0){
                  setData(prev => ({ ...prev, RUT: '', textError: '' }))
               }
               console.log(Fn.validaRut(foo) )
               break;
            default:
               break;
         }
      };

      const handleInputBlur = (event: any) => {
         const newVal = (event.target.value).trim();
         const name = event.target.name;
         setData(prev => ({ ...prev, [name]: newVal }));
         //console.log(data)
      }

      const handleSubmit = async(e) =>{
         e.preventDefault();
         if(!RUT.trim()){
            return setError("RUT")
         }
         if(!correo.trim()){
            return setError("correo");
          //  console.log(error)
         }
         if(!telefono.trim()){
            return setError("telefono")
         }
         else{
            console.log(data)
         await baypassService.PostBaypass(data)
         setData(dataInitial)
         }

      }

   return (
      <>
           <Modal
               open={open}
           >
               <Box className='modal-buy' sx={style}>
                   <Grid mb={2}>
                   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom:'10px' }}>
                            <img className="modal-img" src={imagen} />
                        </div>
                    <Typography className="modal-modal-title" variant="h6" component="h1" textAlign='center'>
                        <strong>Tus datos para atenderte como mereces</strong>
                    </Typography>
                   </Grid>

                   {/* <Box component='form' onSubmit={handleSubmitContact} > */}
                   <Divider style={{width:"100%"}}/>
                   <Box component='form' >
                       <Grid container direction="row" spacing={2} sx={{  mb: 2 }}>
                           <Grid item xs={12}>
                               <Typography style={{ marginTop: "2vh", color: "gray"}}>Correo</Typography>
                               < Input
                               ref={ref => inputRefs.current[0] = ref}
                               type= "text"
                               backgroundColor='#fff'
                               disableElevation
                               validateOnBlur
                               height={40}
                               name="correo"
                               rules={rules.correo}
                               error={error === "correo" ? true : false}
                      // helperText={error === "correo" ? "Correo de la Empresa es un campo requerido" : ""}
                               value={data.correo}
                               onChange={handleInput}
                               onBlur={handleInputBlur}

                               placeholder=" Ejem. correo@dominio.com"/>

                               <Typography style={{ marginTop: "2vh", color: "gray" }}>RUT</Typography>
                               <Input
                               ref={ref => inputRefs.current[1] = ref}
                               type= "text"
                               backgroundColor='#fff'
                               disableElevation
                               validateOnBlur
                               //error={true}
                               height={40}
                                name="RUT"
                                value={data.RUT}
                                onChange={handleInput}
                                onBlur={handleInputBlur}
                                placeholder=" Ejem. 22222222-2"
                                rules={rules.RUT} />
                                {error=='rut'?(console.log('0gjsdj')):(console.log('flaso'))}

                               <Typography style={{ marginTop: "2vh", color: "gray" }}>Teléfono</Typography>
                               <Input
                               ref={ref => inputRefs.current[2] = ref}
                               type= "text"
                               backgroundColor='#fff'
                               disableElevation
                               validateOnBlur
                               height={40}
                               name="telefono"
                               rules={rules.telefono}
                               value={data.telefono}
                               onChange={handleInput}
                               onBlur={handleInputBlur}
                               placeholder=" Ejem. 964 064 235" />
                           </Grid>
                       </Grid>

                       <Grid container direction='row' spacing={2} sx={{ mt: 0, mb: 1 }} justifyContent='flex-end' alignContent='center' >
                           <Button type={"button"} onClick={() => { setOpen(false) }} size="small" >
                               <span style={{ color: "gray" }}>Cancelar</span>
                           </Button>
                           <Grid xs={1}/>
                           <Button
                               type='submit'
                               variant={"contained"}
                               onClick={handleSubmit}
                               //disabled={loading}
                               disableElevation
                           >
                               {
                                   //loading ?
                                       //<CircularProgress className="CircularProgress" size={24} /> :
                                       <span>Enviar</span>
                               }
                           </Button>
                       </Grid>
                   </Box>
               </Box>
           </Modal>
           {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
      </>
   );
}
