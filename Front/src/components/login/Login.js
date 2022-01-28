import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { autenticacionService } from "../../services/autenticacion";
import { Button, CircularProgress, Container, Grid, Input, Paper } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import './Login.css';

export const Login = () => {

    const navigate = useNavigate();
    
    const [loginInput, setLogin] = useState({
        usuario: '',
        rut: '',
        password: '',
        submitted: false,
        loading: false,
        error: '',
    });

    const handleInput = (e) => {
        e.persist();
        const name = e.target.name;
        const value = e.target.value;
        
        switch(name){
            case 'usuario':
                setLogin(prev => ({
                    ...prev,
                    usuario: value
                    
                }));
                break;
            case 'rut':
                setLogin(prev => ({
                    ...prev,
                    rut: value
                }));
                break;
            case 'password':
                setLogin(prev => ({
                    ...prev,
                    password: value
                }));
                break;
            default:
                break;
        }
    }

    const changeSubmit = (e) => {
        setLogin(prev => ({
            ...prev,
            submitted: e
        }))
    }

    const changeLoading = (e) => {
        setLogin(prev => ({
            ...prev,
            loading: e
        }))
    }

    const loginSubmit  = async(e) => {
        e.preventDefault();
        changeSubmit(true);
        const {usuario, rut, password} = loginInput;

        if(!(usuario,rut,password)){
            return;
        }

        changeLoading(true);
        await autenticacionService.login(usuario,rut,password);
        
        if(!localStorage.auth_token){
            changeLoading(false);
            return;
        }else{
            changeLoading(false);
            // Funcion para obtener datos del usuario (para despues)
            // await autenticacionService.user(localStorage.auth_token);
            navigate('/', {
                replace:true
            });
        }
        
    }


    return (
        <div>
            <ToastContainer /> 
            <Container>
            <Grid alignContent='center' container style={{ height: '100vh' }}>
            <Grid item md={2} />
            <Grid item md={4} style={{ paddingTop: '7vh', paddingBottom: '7vh' }} xs={12}>
              <Grid container>
                <h1
                  className='nupyTitulo'
                  style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#1976D2',
                    fontWeight: 600,
                    lineHeight: '10px',
                    fontSize: '8em',
                    marginTop: '8vh',
                    
                  }}
                >
                  NUPY
                </h1>
                <p className='subt' style={{ fontSize: '1.6em', fontWeight: 'bolder', marginTop: '8vh'  }} >
                  Hecho para gestionar tu punto de venta de manera fácil y rápida.
                </p>
              </Grid>
            </Grid>
            <Grid item md={1} />
            <Grid
              item
              md={3}
              style={{
                textAlign: 'left',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              xs={12}
            >
              <Paper elevation={3}>
                <Grid
                  style={{
                    padding: '18px',
                    paddingBottom: '25px',
                    borderTop: '5px solid #1976D2',
                    borderRadius: '5px',
                  }}
                >
                  <center>
                    <h2
                      className='nuppy'
                      style={{
                        color: '#gray',
                        alignItems: 'center',
                        fontWeight: 600,
                        fontSize: '1.6em',
                        marginBottom: 12,
                        marginTop: 12,
                      }}   
                    >
                      Bienvenido!
                    </h2>
                  </center>
                  <form onSubmit={loginSubmit}>
                     <div className={'form-group' + (loginInput.submitted && !loginInput.usuario ? ' has-error' : '')}> 
                      <Input
                        className='form-control'
                        id='usuario'
                        name='usuario'
                        placeholder='Usuario'
                        size='xx-large'
                        style={{
                          marginBottom: '20px',
                          background: '#f3f3f3',
                          marginTop: 12,
                          border: 'none',
                        }}
                        type='text'
                        value={loginInput.usuario}
                        onChange={handleInput}
                      ></Input>
                       {loginInput.submitted && !loginInput.usuario && (
                        <div className='help-block'><ReportIcon id="icono"/>Usuario es requerido</div>
                      )}
                    </div>  
                    <div className={'form-group' + (loginInput.submitted && !loginInput.rut ? ' has-error' : '')}>
                      <Input
                        className='form-control'
                        id='rut'
                        name='rut'
                        placeholder='RUT'
                        size='small'
                        style={{ marginBottom: '20px', background: '#f3f3f3', border: 'none' }}
                        type='text'
                        value={loginInput.rut}
                        onChange={handleInput}
                      ></Input>
                      {loginInput.submitted && !loginInput.rut && <div className='help-block'><ReportIcon id="icono"/>Rut es requerido</div>}
                      {/* {loginInput.submitted && loginInput.rut !== 1 && <div className='help-block'>Rut invalido</div>} HACER VALIDACION DE RUT?*/}
                    </div>
                    <div className={'form-group' + (loginInput.submitted && !loginInput.password ? ' has-error' : '')}>
                      <Input
                        className='form-control'
                        id='pass'
                        name='password'
                        placeholder='Contraseña'
                        size='small'
                        style={{ marginBottom: '20px', background: '#f3f3f3', border: 'none' }}
                        type='password'
                        value={loginInput.password}
                        onChange={handleInput}
                      ></Input>
                      {loginInput.submitted && !loginInput.password && (
                        <div className='help-block'><ReportIcon id="icono"/>Contraseña es requerida</div>
                      )}
                    </div>
                    <div>
                      <Button
                        className='btn '
                        disabled={loginInput.loading}
                        style={{
                          width: '100%',
                          background: '#1976D2',
                          color: 'white',
                          borderRadius: '24px',
                          marginTop: 3,
                          marginBottom: 4,
                        }}
                        type='submit'
                        
                      >
                        {loginInput.loading ? (
                          <CircularProgress className='CircularProgress' size={24} />
                        ) : (
                          <span id='inicio'>Iniciar sesión</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Grid>
              </Paper>
              {loginInput.error && <div className={'alert alert-danger'}>{loginInput.error}</div>} 
            </Grid>
            </Grid>
            </Container>
        </div>
    )
}
