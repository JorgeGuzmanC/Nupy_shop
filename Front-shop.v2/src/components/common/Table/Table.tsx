import React, { useState } from 'react';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
import { esES } from '@mui/material/locale';
import DeleteIcon from '@mui/icons-material/Delete';
import { VisibilityIcon, PencilIcon, MoreIcon} from "@toolbox/constants/icons";
import { Link } from 'react-router-dom';
import { indigo } from '@mui/material/colors';
import {useHistory} from 'react-router-dom';

type TableProps = {
    header: Array<any>,
    data: Array<any>,
    action?: Array<any>,
    idDelete?:(data) => void,
    RecuperarData?:(data) => void,
    setAddOpen?:any,
}
export const TableData: React.FC<TableProps> = (
    props: TableProps
): JSX.Element => {
   const history= useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976D2' },
            },
        },
        esES,
    );
   const nextPage = (toroute, row) => {
      history.push(toroute, row);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <ThemeProvider theme={theme}>
                    <Table aria-label="simple table" size='small'>
                        <TableHead >
                        <TableRow sx={{ bgcolor:'#1976D2'}}>
                                {props.header.map((cell, i) => {
                                   return( <TableCell key={i} sx={{ color: 'white' }} width={cell.width} ><strong>{cell.label}</strong></TableCell>

                                )})}

                                {props.action !== null ? (<TableCell align='center' sx={{ color: 'white' , minWidth:'8rem', maxWidth:'12rem'}}><strong>Acciones</strong></TableCell>
                                ) : null}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                              {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, id_data) => {
                               return (
                                <TableRow hover key={id_data}>
                                  {props.header.map((cabecera,id) => {
                                    const value = data[cabecera.name];
                                    return (
                                      <TableCell key={id}>
                                        {value}
                                      </TableCell>
                                    );

                                  })}
                                   {props.action?(
                                   <TableCell align='center'>
                                       {props.action.map((ac:any,i:number) =>{
                                         const Name= ac["name"]
                                          switch (Name) {
                                             case 'delete':
                                                return (
                                                   <Button key={i} onClick={()=>{props.RecuperarData(props.data[id_data])}}>
                                                      <DeleteIcon />
                                                   </Button>
                                                   );
                                             case 'edit':
                                                return (<Button key={i} onClick={() => {
                                                   if(ac.route)
                                                   {
                                                      nextPage(ac.route,{...props.data[id_data], action:"edit"} )
                                                   }else
                                                   {
                                                      props.RecuperarData({...props.data[id_data], action:"edit"})
                                                   }
                                                }} >
                                                   <PencilIcon />
                                                </Button>);
                                             case 'view':
                                                return (<Button key={i} onClick={() => {
                                                   if(ac.route)
                                                   {
                                                      nextPage(ac.route,{...props.data[id_data], action:"view"} )
                                                   }else{
                                                      props.RecuperarData({...props.data[id_data], action:"view"})
                                                   }

                                                }}>
                                                   <VisibilityIcon />
                                                </Button>);
                                             case 'add':
                                                return (
                                                   <Button key={i} onClick={() => { setOpen(true) }}>
                                                      <MoreIcon />
                                                   </Button>);
                                        }
                                       })}
                                    </TableCell>):null}
                                </TableRow>
                              );
                            })}
                        </TableBody>

                    </Table>
                    <TablePagination
                        component="div"
                        count={props.data.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 15]}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </ThemeProvider>
            </TableContainer>
        </>
    );
}
