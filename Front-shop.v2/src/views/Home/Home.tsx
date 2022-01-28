import { FunctionComponent } from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Protected } from "@/components/layout/Protected";
import {Pagos} from './components/Pagos'

export const Home: FunctionComponent = (props: any) => {
   return (
      <Protected>
        <Grid container>
            <Grid item lg={7}  sx={{minHeight:'80vh', maxHeight:'80vh', overflowY:'scroll'}}>

            </Grid>
            <Grid item lg={5} container direction='row'>
               <Grid xs={12} sx={{minHeight:'45vh', maxHeight:'45vh', overflowY:'scroll'}}>

               </Grid>
               <Grid xs={12} sx={{minHeight:'35vh', maxHeight:'35vh', overflowY:'scroll'}}>
                  <Pagos/>
               </Grid>
            </Grid>
        </Grid>
      </Protected>
   )
}

