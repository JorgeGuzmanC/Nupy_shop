import { TableData } from "@/components/common/Table";
import { Protected } from "@/components/layout/Protected";
import { ROUTE_SALAS } from "@/toolbox/constants/route-map";
import { Box, Button, Container, Divider, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { height } from "@mui/system";
import React, { useState } from "react";
import { ModalCreateSala } from "./components/ModalCreateSala";
import {Props} from './Salas.type'


const header=[{name:'id',label:'N°',width:''},{name: 'nombre',label:'Nombre de Sala',width:''},{name: 'creada',label:'Creada',width:''},{name: 'mesas',label:'Cantidad de Mesas',width:''}];
const dataAction = [
   { name: 'edit', color: 'success' },
]

const dataInitial=[
   { id: '1', nombre: 'SALA PRINCIPAL', creada: '01-02-2021',mesas: 2 },
   { id: '2', nombre: 'SALA BALCÓN' , creada: '01-02-2021', mesas: 2 },
]
export const Salas: React.FC<Props> = (props:Props): JSX.Element => {

   const [dataSala,setDataSala]=useState<any>(dataInitial)
   const [open,setOpen] = useState<any>(false);

   const [dataModalSala, setDataModalSala] = useState<any>(false);


   const RecuperarData = async(data) =>{

      console.log(data)
      if(data.action =='edit'){
         setOpen(true)
         setDataModalSala(data)
      }

   }
   return (
      <Protected>
         <Container maxWidth='xl' sx={{ mt: 1, mb: 2 }}>
                <Grid container justifyContent='space-between' spacing={2}>
                    <Grid item>
                        <Typography variant='h4' >Gestión de Sala</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined'
                        onClick={()=>{setOpen(true)}}
                        >Crear Salas</Button>
                    </Grid>
                </Grid>
                <Divider
                    sx={{ mt: 2 }} />
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ mt: '20px' }} >
                        {dataSala.length ? `${dataSala.length} registros encontrados` : `0`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel >Filtrar Resultados</InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="text"
                            placeholder="Introduce una Palabra"
                            type="search"
                            id="password"
                            autoComplete="current-password"
                            size="small"
                        />
                    </Grid>
                </Grid>
            <Grid container sx={{ mt: 1 }}>
               <TableData
                  header={header}
                  data={dataSala}
                  action={dataAction}
                  RecuperarData={RecuperarData}
                  />
            </Grid>
         </Container>
         <ModalCreateSala
         open={open}
         setOpen={setOpen}
         dataSala={dataModalSala}
         />
      </Protected>
   )

}
