import axios from 'axios';
import { API_URL_NUPY } from '@/toolbox/defaults/app';

export const editorRepository = {
    cargarModulos: async( id_empresa:any ): Promise<any> =>{
        const res = await axios.get(`${API_URL_NUPY}/showModulos/get_modulos/${id_empresa}`);
        return res.data;
    },

    addModulo: async( nombre: any , state: any, id_empresa:any ): Promise<any> =>{
        const res = await axios.post(`${API_URL_NUPY}/crudModulos/add_modulo`, { nombre, state, id_empresa });
        return res;
    },

    deleteModulo: async( id: Number ): Promise<any> =>{
        const res = await axios.delete(`${API_URL_NUPY}/crudModulos/delete_modulo/${id}`);
        return res;
    },

    cargarSubModulos: async( id:any ): Promise<any> =>{  
        const res = await axios.post(`${API_URL_NUPY}/showModulos/get_submodulos`, {submodulos: id});
        return res.data;
    },

    addSubmodulo: async( nombre: any , state: any ): Promise<any> =>{
        const res = await axios.post(`${API_URL_NUPY}/crudModulos/add_submodulo`, { nombre, state });
        return res;
    },

    addSubmoduloAModulo: async( id_modulo: any , id_submodulo: any ): Promise<any> =>{
        const res = await axios.put(`${API_URL_NUPY}/crudModulos/add_sub/${id_modulo}/${id_submodulo}`);
        return res;
    },

    deleteSubmodulo: async( id: Number ): Promise<any> =>{
        const res = await axios.delete(`${API_URL_NUPY}/crudModulos/delete_submodulo/${id}`);
        return res;
    },

    deleteSubmodulos: async( ids: Number ): Promise<any> =>{
        const res = await axios.delete(`${API_URL_NUPY}/crudModulos/delete_submodulos/${ids}`);
        return res;
    },
    
}
