import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from "axios";


export const autenticacionService = {
    login,
    user,
    logout
}

async function login( usuario, rut, password ){
    await axios.post('http://127.0.0.1:8000/api/auth/login', {usuario,rut,password}).then(res => {
        localStorage.setItem('auth_token', res.data.access_token);
        localStorage.setItem('rut', rut);
        user(res.data.access_token);
        return res;
    }).catch(error => {
        toast.error('Credenciales incorrectas', { position: toast.POSITION.TOP_RIGHT })
        return false;
    })
}

async function user(token){
    
    await axios.post('http://127.0.0.1:8000/api/auth/me', {token}).then(res => {
        //console.log(res.data.id_empresa);
        // const {num} = res.data.id_empresa
        // a = num;
        
        localStorage.setItem('usuario', res.data.usuario);
        localStorage.setItem('rol', res.data.rol);
        localStorage.setItem('id_empresa', res.data.id_empresa);
        return res;
    }).catch(error => {
        toast.error('Error al obtener usuario', { position: toast.POSITION.TOP_RIGHT })
        return false;
    })
    
}

async function logout(token){
    await axios.post('http://127.0.0.1:8000/api/auth/logout', {token}).then(res => {
        //toast.success('Deslogeado', { position: toast.POSITION.TOP_RIGHT })
        return res;
    }).catch(error => {
        return false;
    })

}