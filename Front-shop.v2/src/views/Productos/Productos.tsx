import { Protected } from "@/components/layout/Protected";
import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { height } from "@mui/system";
import React, { useState } from "react";
import {Props} from './Productos.type'

export const ProductosMaestros: React.FC<Props> = (props:Props): JSX.Element => {

   const [open,setOpen] = useState<any>(false);




   return (
      <Protected></Protected>
   )

}
