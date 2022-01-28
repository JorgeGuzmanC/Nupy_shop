import * as React from 'react';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import './Home.css';

import LunchDiningIcon from '@mui/icons-material/LunchDining';


import Grid from '@mui/material/Grid';
import LocalBarIcon from '@mui/icons-material/LocalBar';

//hacer funcion 



 export const Home = () => {
     return (
         <div>
             <h1>Home</h1>
             <Grid container justifyContent="left" spacing={3}>

             <Grid item xs={1} md={1} >
     <Card sx={{ maxWidth: 300 }} className="aaa">
       <CardActionArea>

       <CardContent height="140">
           <LocalBarIcon  id="icono2"/>
         </CardContent>

         <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Producto 1
           </Typography>
          <Typography variant="body2" color="text.secondary">
             Lorem ipsum 

           </Typography>
        </CardContent>
       
       <CardActions>
      {/* <Icon className="add"sx={{ color: green[500] }} fontSize="big">add_circle</Icon>  */}
       </CardActions>
       </CardActionArea>
     </Card>
    </Grid>



     <Grid item xs={1} >
     <Card sx={{ maxWidth: 300 }} className="aaa">
       <CardActionArea>

       <CardContent height="150">
           <LocalBarIcon  id="icono2"/>
         </CardContent>

         <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Producto 2
           </Typography>
          <Typography variant="body2" color="text.secondary">
             Lorem ipsum 

           </Typography>
        </CardContent>
      
       <CardActions>
      {/* <Icon className="add"sx={{ color: green[500] }} fontSize="big">add_circle</Icon> */}
       </CardActions>
       </CardActionArea>
     </Card>
    </Grid>

     <Grid item xs={1}>
     <Card sx={{ maxWidth: 300 }} className="aaa" >
       <CardActionArea>
        
         <CardContent height="140">
           <LunchDiningIcon  id="icono2"/>
         </CardContent>
         <CardContent>
          <Typography gutterBottom variant="h5" component="div">
             Producto 3
           </Typography>
           <Typography variant="body2" color="text.secondary">
             Lorem ipsum 

          </Typography>
         </CardContent>
      
       <CardActions>
       {/* <Icon className="add"sx={{ color: green[500] }} fontSize="big">add_circle</Icon> */}
       </CardActions>
       </CardActionArea>
     </Card>
    </Grid>

     <Grid item xs={1}>
     <Card sx={{ maxWidth: 300 }} className="aaa">
       <CardActionArea>
        
        <CardContent height="140">
        <LunchDiningIcon  id="icono2"/>
         </CardContent>
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
            Producto 4...
           </Typography>
           <Typography variant="body2" color="text.secondary">
             Lorem ipsum 

           </Typography>
         </CardContent>
       
       <CardActions>
      {/* <Icon className="add"sx={{ color: green[500] }} fontSize="big">add_circle</Icon> */}
      </CardActions>
      </CardActionArea>
     </Card>
     </Grid>
       </Grid>
            
            
         </div>
        
     )
 }