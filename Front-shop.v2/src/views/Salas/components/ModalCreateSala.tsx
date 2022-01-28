import  React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Divider,FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import {SaveIcon,CancelIcon } from "@toolbox/constants/icons";
import './Modal.sass'
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import PaidIcon from '@mui/icons-material/Paid';
import BusinessIcon from '@mui/icons-material/Business';
import RuleIcon from '@mui/icons-material/Rule';
import TimelineIcon from '@mui/icons-material/Timeline';
import EditIcon from '@mui/icons-material/Edit';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const initialFormValues = {
  nombre: '',
  cantidad: '',
}

type ModalProps = {
  open: boolean,
  setOpen:any,
  dataSala?:any
}
export const ModalCreateSala:React.FC<ModalProps> = (
  props: ModalProps
): JSX.Element =>{

   console.log(props.dataSala)
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues);

  const {
    nombre ,
    cantidad
  } = formValues

//   useEffect(() => {

// }, [])
console.log(props.dataSala.action)
  const handleFormValues = (e) => {
    const handleChangeFormValues = {
      ...formValues,
      [e.target.name]: e.target.value
    }
    handleChangeFormValues.nombre.trim() !== "" && setError("");
    setFormValues(handleChangeFormValues)

  }
  const handleForm = async (e) => {
    e.preventDefault();
    if(props.dataSala.action == 'edit'){
        console.log({formValues});
       // const resp = await campaingService.updateCampaign(props.CampaignEdit.id,formValues)
        setFormValues(initialFormValues);
        //props.set(null)
         props.setOpen(false);
    }else{
      if (!nombre) {return setError("nombre");}
      else
      {
         let resp;
         const usuario = readLocalStorage(KEY_USER_DATA)
      const data = {
         ...formValues,
             //fechaapertura: fechaapertura,
             idusuario: usuario.user.idusuario,
             propietario: usuario.user.rut_empresa,
         }
         console.log({data});

         setFormValues(initialFormValues);
         props.setOpen(false);
     }
    }

  }


  const bodyModal = (
    <Box className='Modal'>
      <Typography id="modal-modal-title" variant="h5" component="h1" textAlign='center' color='primary'>
        <strong style={{fontWeight:600}}>{props.dataSala.action =='edit'?'Editar Sala':'Crear Sala'}</strong>
      </Typography>
      <Box component='form' onSubmit={handleForm}>
        <Grid container direction="row" spacing={2} sx={{ mt: 1, mb: 2 }} >
            <Grid item xs={12}>
                  <TextField
                  sx={{bgcolor:'#fff'}}
                  size='small'
                  InputProps={{
                     startAdornment: (
                     <InputAdornment position="start">

                     </InputAdornment>
                     ),
                  }}
                  error={error === "nombre" ? true : false}
                  helperText={error === "nombre" ? "Nombre es es un campo requerido" : ""}
                  id="nombre"
                  //label="Nombre"
                  placeholder='Nombre de la Sala'
                  name='nombre'
                  value={nombre}
                  fullWidth
                  onChange={handleFormValues}
                  />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{bgcolor:'#fff'}}
              size='small'
              InputProps={{
               startAdornment: (
                 <InputAdornment position="start">

                 </InputAdornment>
               ),
             }}
              error={error === "nombre" ? true : false}
              helperText={error === "nombre" ? "Nombre es es un campo requerido" : ""}
              id="mesas"
              //label="mesas"
              placeholder='N° de Mesas'
              name='mesas'
              type='number'
              //value={cantidad}
              fullWidth
              onChange={handleFormValues}
            />
          </Grid>

        </Grid>
        <Divider />
        <Grid container direction='row' spacing={2} sx={{ mt: 0, mb: 1 }} justifyContent='flex-end' alignContent='center' >
          <Grid item >
            <Button
              variant='contained'
              color='error'
              onClick={() => {props.setOpen(false);
               setFormValues(initialFormValues);
               //props.setCampaingEdit?(props.setCampaingEdit(null)):''
            }}
              endIcon={<CancelIcon/>}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              type='submit'
              endIcon={props.dataSala.action=='edit'?<EditIcon/>:<SaveIcon/>}
            >
              {props.dataSala.action=='edit'?'Editar':'Guardar'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )



  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => {props.setOpen(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {bodyModal}
      </Modal>
    </div>
  );
}
