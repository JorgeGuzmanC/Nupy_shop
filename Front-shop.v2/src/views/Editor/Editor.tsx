import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { editor } from "../../service/services/Editor.service";
import {AddCategoria} from "./components/AddCategoria";
import {AddSubCategoria} from "./components/AddSubCategoria";
import { Loading } from '../../components/common/Loading/Loading'


import { Protected } from '@/components/layout/Protected';
import { FunctionComponent } from "react";
import { Button, Grid } from "@mui/material";
import { Popup } from './components/Popup/Popup';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

export const Editor: FunctionComponent = (props: any) => {
    
    const [openPopup, setOpenPopup] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [modulo, setModulo] = React.useState([]);
    const [submodulo, setSubModulo] = React.useState([]);
    const [submoduloActual, setSubModuloActual] = React.useState([]);
    const [productosActual, setProductosActual] = React.useState(-1);
    
    const [loadData,setLoadData] = React.useState<boolean>(false);
    // const [sub, setSub] = React.useState([]);

    const handleChange = (event, newValue) => {
        setProductosActual(-1);
        setValue(newValue);
    };
    

    async function eliminarModulo(item){
      
      const res1 = await editor.deleteModulo(item.id);
      console.log(res1);
      if(item.submodulos){
        const res2 = await editor.deleteSubmodulos(item.submodulos);
        console.log(res2);
      }
      //DELETE SUB
      //DELETE PRODUCTOS
      window.location.reload();
    }

    // async function eliminarSubmodulo(item){
      
    //   const res2 = await editor.deleteSubmodulo(item.submodulos);
    //   console.log(res2);
      
      
    //   //DELETE PRODUCTOS
    //   window.location.reload();
    // }


    async function cargarSubModulos(ids: any){
      const res = await editor.cargarSubModulos(ids);
      if(res.status != 400){
        
        
        const submodulos: any = Object.values(res.submodulos);
        submodulo.push(submodulos)
        
        setSubModulo(submodulo);
        setLoadData(false);
      }else{
        if(res.status == 400){
          setLoadData(false);
          return;
        }else{
          setLoadData(false);
          console.log('error');
          return;
        }
      } 
    }

    // async function cargarProductos(ids: any){
      
    // }

    
    

    React.useEffect(() => {
        async function fetch(){
            setLoadData(true);
            const res = await editor.cargarModulos();
            
            if(res.status != 400){

                const modulos: any = Object.values(res.modulos);

                for(let i = 0; i<modulos.length;i++){
                  if(modulos[i].submodulos){
                    cargarSubModulos(modulos[i].submodulos);
                  }else{
                    console.log('no existe');
                  }
                }
                setModulo(modulos);
                
            }else{
                if(res.status == 400){
                  setLoadData(false);
                  return;
                }else{
                  console.log('error');
                  setLoadData(false);
                  return;
                }
            } 
        }
        fetch();
    },[]);


    async function cargarSubModulo(index){
      setSubModuloActual([]);
      if(submodulo[index]){
        const array = submodulo[index];
        
        setSubModuloActual(array);
      }else{
        setSubModuloActual([]);
      }
    }



    if(modulo){
        const modulo_html = modulo.map((item,index) => {
            return(
                <Tab 
                    key={item.id} 
                    label={item.nombre}
                    onClick={() => cargarSubModulo(index)}
                    style={{
                        width: '15%',
                        height: '60px',
                        fontSize: '13px',      
                    }}
                />
                

            )
        })
        
        const submodulo_html = ()=>{
          if(submoduloActual){
            const sub = submoduloActual.map((item,index) => {
              const valor = Object.values(item);
              const nombre = valor[0]['nombre'];
              if(item){
                return(
                  <Button onClick={()=>{
                    setProductosActual(index);
                  }} style={{marginRight: '10px', marginTop: '15px',color: 'black'}} variant="outlined">{nombre}</Button>
                )
              }
            })
            return(sub);
          }
        }

        const submodulo_tab = ()=>{
          if(submoduloActual){
            const sub = submoduloActual.map((item,index) => {
              const valor = Object.values(item);
              const nombre = valor[0]['nombre'];
              if(index == productosActual){
                return(
                  <Box style={{marginTop: '20px'}}>
                    {nombre.toUpperCase()}
                    <Button 
                    //onClick={() => eliminarModulo(item)} 
                    variant="contained" color="error" size="small" style={{marginLeft: '20px'}}>
                      Delete
                    </Button>
                  
                </Box>
                )
              }
            })
            return(sub);
          }
        }
        


        const modulo_tab = modulo.map((item,index) => {
            return(
              <Box >
              <TabPanel value={value} index={index+1} key={item.id} >
                <Box>
                  {item.nombre.toUpperCase()}
                  <Button onClick={() => eliminarModulo(item)} variant="contained" color="error" size="small" style={{marginLeft: '20px'}}>
                    Delete
                  </Button>
                  
                </Box>
                <Box>
                  <Button size="small" style={{marginRight: '10px',marginTop: '15px',color: 'black'}} variant="outlined"
                  onClick={() => setOpenPopup(true)}
                  // onClick={() => submodulo_html} 
                  ><AddCircleIcon style={{verticalAlign: 'middle', marginTop: '-3px', fontSize: '25px'}} sx={{color: '#FF971B'}}/> 
                    Agregar 
                  </Button>
              

                  <Popup 
                      title = "Agregar Submodulo"
                      openPopup = {openPopup}
                      setOpenPopup = {setOpenPopup}
                  >
                      <AddSubCategoria num={item.id}/> 
                  </Popup>
                  
                  {submodulo_html()}
                  {submodulo_tab()}
                  
                  {/* {productosActual && (
                  <Box>{productosActual.nombre.toUpperCase()}
                    <Button  variant="contained" color="error" size="small" style={{marginLeft: '20px'}}>
                      Delete
                    </Button>
                  </Box>
                  )
                  } */}
                  
                  
                
                  
                </Box>
              </TabPanel>            
              </Box>
            )
          
        })
        

        return(
            <Protected>
            {loadData && <Loading/>}
            <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper'}}>
        
            <Tabs
              value={value}
              onChange={
                handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable auto tabs example"
              style={{
                
                
              }}
            >

            <Tab onClick={() => setOpenPopup(true)}  label={<div><AddCircleIcon style={{verticalAlign: 'middle', marginTop: '-3px', fontSize: '25px'}} sx={{color: '#FF971B'}}/> Nuevo </div>} style={{
                width: '15%',
                height: '60px',
                fontSize: '13px',
            }}/>

               
            {modulo_html}

            </Tabs>
 
            <Popup 
                title = "Agregar Modulo"
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
            >
                <AddCategoria/> 
            </Popup>
            
          </Box>
          <Box  sx={{backgroundColor: '#EDEDED'}}>
            {modulo_tab}
          </Box>
          
          
          </Protected>
        );
    }
}



// 1.- modulo: agregar, eliminar(todo hacia abajo), cargar submodulos
// 2.- submodulo: agregar, eliminar(todo hacia abajo), cargar productos
// 3.- productos: agregar, editar, eliminar.
// hacer servicio
