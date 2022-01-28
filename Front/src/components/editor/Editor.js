import { Link } from 'react-router-dom';
//import { autenticacionService } from "../../services/autenticacion";
// import { editorService } from "../../services/editor";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { boxSizing, fontSize, margin, sizing } from '@mui/system';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }


export const Editor = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (

        
        
        <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper'}}>

        
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
          style={{
            
            
          }}
        >
            {/* <Button style={{
                width: '15%',
                height: '60px',
                fontSize: '13px'
                }}>AAAAAAAAA

            </Button>
            <Link to={'add_categoria'} style={{
                width: '200px',
                height: '60px',
                fontSize: '13px',
                color:'red'
                }}>AAA</Link>
            <LinkTab label="Nuevo" href="" /> */}
            {/* <Link to={'add_categoria'} >
                <Tab label="Nuevo" style={{
                width: '15%',
                height: '60px',
                fontSize: '13px'
                }}/>
            </Link>
            <Tab>
                <Link to={'add_categoria'} />
            </Tab> */}
            
            <Tab component={Link} to={'add_categoria'}  label={<div><AddCircleIcon style={{verticalAlign: 'middle', marginTop: '-3px', fontSize: '25px'}} /> Nuevo </div>} style={{
                width: '15%',
                height: '60px',
                fontSize: '13px',
                
            }}></Tab>
          
          
            {/* <LinkTab label="Nuevo" href="" /> */}
            
    
          <Tab label="Item Uno" style={{
            width: '15%',
            height: '60px',
            fontSize: '13px',
            
          }}/>
          <Tab label="Item Two" style={{
            width: '15%',
            height: '60px',
            fontSize: '13px'
          }}/>
          <Tab label="Item Three" style={{
            width: '15%',
            height: '60px',
            fontSize: '13px'
          }}/>
          <Tab label="Item Four" style={{
            width: '15%',
            height: '60px',
            fontSize: '13px'
          }}/>
          <Tab label="Item Five" style={{
            width: '15%',
            height: '60px',
            fontSize: '13px'
          }}/>
          <Tab label="Item Six" style={{
            width: '15%',
            height: '60px',
            fontSize: '13px'
          }}/>
          <Tab label="Item Six" style={{
            width: '15%',
            height: '60px',
            fontSize: '13px'
          }}/>
        </Tabs>
      </Box>
    );
}
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12">
//                     <div className="card">
//                         <div className="card-header">
//                             <h4>
//                                 Modulos
//                                 <Link to={'add_categoria'} className="btn btn-primary btn-sm float-end">Agregar Modulo</Link>
//                             </h4>
                            
                            
//                             <h4>
//                                 Subcategoria
//                                 <Link to={'add_sub_categoria'} className="btn btn-primary btn-sm float-end">Agregar Subcategoria</Link>
                                
//                             </h4>

//                             <h4>
//                                 Productos
//                                 <Link to={'add_producto'} className="btn btn-primary btn-sm float-end">Agregar Producto</Link>
                                
//                             </h4>
//                             <div className="card-body">

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//         </div>
//     )
// }

// 1.- modulo: agregar, eliminar(todo hacia abajo), cargar submodulos
// 2.- submodulo: agregar, eliminar(todo hacia abajo), cargar productos
// 3.- productos: agregar, editar, eliminar.
// hacer servicio
