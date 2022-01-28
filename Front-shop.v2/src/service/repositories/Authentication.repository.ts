import { http } from '../http/http';
import { LoginDTO, LogoutDTO, UserDTO } from '../http/dto/AuthenticationDTO';
import { Login, Logout, Authentication } from '../models/Authentication';
import { API_URL_BASE, API_URL_NUPY } from '@/toolbox/defaults/app';
import axios from 'axios';

export const authenticationRepository = {
   // login: async (user_nick: string, rut_empresa: string, password: string): Promise<any>=> {
   //    const resp = await http.post<any>(`http://127.0.0.1:8000/api/auth/login`, {
   //       usuario: user_nick,
   //       rut: rut_empresa,
   //       password: password,
   //    })

   //    return resp;
   // },
   login: async ( usuario: string, rut: string, password: string ): Promise<any> =>{
      const resp = await axios.post('http://127.0.0.1:8000/api/auth/login', {usuario,rut,password});
      return resp;
  },

   loginSoftnet: async (username: string, rut: string, password: string): Promise<any>=> {
      const resp = await http.post<any>(`http://api.softnet.cl/login`, {
         username: username,
         rut: rut,
         password: password
      })
      return resp;
      // {
      //    error: resp.error,
      //    status: resp.status,
      //    message: resp.message,
      //    token: resp.token
      // }
   },
   logout: async (): Promise<Logout>=> {
      const resp = await http.post<LogoutDTO>(`${API_URL_BASE}/v1/auth/sign-out`)
      return {
         error: resp?.error,
         status: resp?.status,
         message: resp?.message
      }
   },
   profile: async (access_token: string): Promise<any>=> {
      const resp = await http.post<any>(`http://127.0.0.1:8000/api/auth/me`, {access_token} )
      console.log(resp)
      return resp;
   },
   //registro para empresa
    registro: async ( id: Number, nombre: String, rut: String , formas_de_pago: String, state: Number): Promise<any> =>{
      const resp = await axios.post(`${API_URL_NUPY}/registro_empresa`, {id,nombre,rut,formas_de_pago,state});
      console.log(resp);
      return resp;
    },

   dataUser,
   dataEmpresa,
}

function dataUser(token){
   return fetch(`http://api.softnet.cl/datoUsuario`, {
     method: 'GET',
     headers: {
       'Access-Control-Allow-Origin':'*',
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
   })
     .then(datosUsuarios => datosUsuarios.json())
     .then(datosUsuarios => {
       localStorage.setItem('dataUser', JSON.stringify(datosUsuarios[0]))
       return datosUsuarios[0];
     })
     .catch(error => {
       return false;
     })
 }

 function dataEmpresa(token){
   return fetch(`http://api.softnet.cl/datoEmpresa`, {
     method: 'GET',
     headers: {
       'Access-Control-Allow-Origin':'*',
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
   })
     .then(datosEmpresa => datosEmpresa.json())
     .then(datosEmpresa => {
      // localStorage.setItem('dataUser', JSON.stringify(datosEmpresa[0]))
       return datosEmpresa[0];
     })
     .catch(error => {
       return false;
     })
 }

 

