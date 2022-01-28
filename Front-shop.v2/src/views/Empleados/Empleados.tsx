import { Protected } from "@/components/layout/Protected";
import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { height } from "@mui/system";
import React, { useState } from "react";
import {Props} from './Empleados.type'

const header=[{name:'id',label:'N°',width:''},{name: 'nombre',label:'Nombre de Sala',width:''},{name: 'creada',label:'Creada',width:''},{name: 'mesas',label:'Cantidad de Mesas',width:''}];
const dataAction = [
   { name: 'edit', color: 'success' },
]

const dataInitial=[
   { id: '1', nombre: 'SALA PRINCIPAL', creada: '01-02-2021',mesas: 2 },
   { id: '2', nombre: 'SALA BALCÓN' , creada: '01-02-2021', mesas: 2 },
]

export const Empleados: React.FC<Props> = (props:Props): JSX.Element => {

   const [open,setOpen] = useState<any>(false);




   return (
      <Protected></Protected>
   )

}
