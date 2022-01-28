import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { height } from "@mui/system";
import React, { useState } from "react";
import {Props} from './Pagos.type'

export const Pagos: React.FC<Props> = (props:Props): JSX.Element => {

   const [open,setOpen] = useState<any>(false);

  const handleSubmit = ()=>{

  }


  const TipoPago = [
   { id: 1, title: 'Cash' },
   { id: 2, title: 'TransBank' },
   { id: 3, title: 'GesNet'},
   { id: 4, title: 'Convenio' },
   { id: 5, title: 'Electronico'}
];
   return (
      <Box sx={{ padding:2}}>
         <form onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  <Grid item xs={12} >
                     <TextField
                           fullWidth
                           //error={error === "prioridad" ? true : false}
                           //helperText={error === "prioridad" ? " La prioridad es un campo requerido" : ""}
                           size="small"
                           id="cliente"
                           label="Cliente*"
                           name="cliente"
                           type="text"

                           //value={prioridad}
                           //onChange={handleInputChange}
                     />
                  </Grid>
                  {
                     open?(<>
                     <Grid item container spacing={2}>
                     <Grid item xs={12}>
                           <FormControl fullWidth>
                                 <InputLabel id="grupopago">Grupo de Pago</InputLabel>
                                 <Select
                                    labelId="grupoPago"
                                    id="grupoPago"
                                    size="small"
                                    fullWidth
                                    name="grupoPago"
                                    //value={grupoPago}
                                    label="Grupo de Pago "
                                    //onChange={handleInputChange}
                                 >
                                    {TipoPago.map((option, i) => {
                                       return <MenuItem key={i} value={option.title}>{option.title}</MenuItem>
                                    })
                                    }
                                 </Select>
                           </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                           <FormControl fullWidth>
                                 <InputLabel id="grupopago">Tipo de Pago</InputLabel>
                                 <Select
                                    labelId="tipoPago"
                                    id="tipoPago"
                                    size='small'
                                    fullWidth
                                    name="tipoPago"
                                    //value={grupopago}
                                    label="Tipo de Pago "
                                    //onChange={handleInputChange}
                                 >
                                    {TipoPago.map((option, i) => {
                                       return <MenuItem key={i} value={option.title}>{option.title}</MenuItem>
                                    })
                                    }
                                 </Select>
                           </FormControl>
                     </Grid>
                  </Grid>
                     </>):(
                        <Grid item container spacing={2}>
                        <Grid item xs={4} >
                           <strong>Monto</strong>
                           <Input

                                 size="small"
                                 id="cliente"
                                 name="cliente"
                                 type="number"


                           />
                        </Grid>
                        <Grid item xs={4}>
                           <strong>Vuelto</strong>
                           <Input
                                 size="small"
                                 id="cliente"
                                 name="cliente"
                                 type="number"


                           />
                        </Grid>
                        <Grid item xs={4} >
                           <strong>Total</strong>
                           <Input
                                 size="small"
                                 id="cliente"
                                 name="cliente"
                                 type="number"

                           />
                        </Grid>
                     </Grid>
                     )
                  }
                  <Grid item xs={12} >
                        {
                           open?(
                              <>
                              <Grid container direction='row' justifyContent='space-between' spacing={2}>
                                 <Grid item xs={3}>
                                    <Button
                                    fullWidth
                                    variant="contained"
                                    color='error'
                                    size='small'

                                    onClick={()=>setOpen(false)}
                                    //endIcon={<SaveIcon />}
                                    sx={{ mt: "10px" }}
                                    >
                                       Atras
                                    </Button>
                                 </Grid>
                                 <Grid item xs={6}>
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color='success'

                                    size='small'
                                    onClick={()=>setOpen(false)}
                                    //endIcon={<SaveIcon />}
                                    sx={{ mt: "10px" }}
                                    >
                                       Finalizar y Pagar
                                    </Button>

                                 </Grid>
                              </Grid>
                              </>
                           ):(
                              <Button
                              variant="contained"
                              color='success'
                              fullWidth
                              onClick={()=>setOpen(true)}
                              //endIcon={<SaveIcon />}
                              sx={{ mt: "10px" }}
                              >
                                 Continuar
                              </Button>
                           )
                        }


                  </Grid>
               </Grid>
         </form>
      </Box>
   )

}
