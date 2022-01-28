import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Grid,  Divider,  Modal, CircularProgress } from '@mui/material';
import {  Box, Button } from '@mui/material';

import '../../styles/nupy-app.css'

import imagen from '@assets/img/nupy-logo.png';
import { Props } from "./ModalConsult.type";


export const ModalConsult: React.FC<Props> = ({
    open,
    setOpen,
    handleSubmit,
    loading
}): JSX.Element => {
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        form: {
            folio: '',
            monto: '',
            fecha: '',
            tipoModal: ''
        }

    });
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        borderRadius: '20px',
        bgcolor: 'background.paper',
       
        boxShadow: 24,
        p: 3,
        background: '#F5F5F5'
    };

    return (
        <>
            <Modal
                open={open}

            >
                <Box className='Modal' sx={style}>
                    <Grid mb={2} className="modal-tittle" >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom:'10px' }}>
                            <img className="modal-img" src={imagen} />
                        </div>
                        <Typography className="modal-modal-title" variant="h6" component="h1" textAlign='center'>
                            <strong>Consulte su boleta</strong>
                        </Typography>
                    </Grid>

                    <Divider style={{ width: "100%" }} />
                    <Box component='form' >
                        <Grid container direction="row" spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} >
                                <Typography style={{ marginTop: "2vh", color: "gray" }}>Recibo</Typography>
                                <input type="text" className="modal-login__input" name="recibo" placeholder=" Ingrese el número de recibo" />

                                <Typography style={{ marginTop: "2vh", color: "gray" }}>ID</Typography>
                                <input type="text" className="modal-login__input" name="idEmpresa" placeholder=" Ingrese el ID de la empresa" />
                                
                            </Grid>
                        </Grid>

                        <Grid container direction='row' spacing={2} sx={{ mt: 0, mb: 1 }} justifyContent='flex-end' alignContent='center' >
                            <Button type={"button"} onClick={() => { setOpen(false) }} size="small" >
                                <span style={{ color: "gray" }}>Cancelar</span>
                            </Button>
                            <Grid xs={1} />
                            <Button
                                type={"button"}
                                variant={"contained"}
                                onClick={handleSubmit}
                                disabled={loading}
                                disableElevation
                            >
                                {
                                    loading ?
                                        <CircularProgress className="CircularProgress" size={24} /> :
                                        <span>Enviar</span>
                                }
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}