import { editorRepository } from "../repositories/Editor.repository";
import axios from "axios";
import {KEY_USER_DATA} from '@constants/local-storage';
import {readLocalStorage} from '@helpers/local-storage-helper';

export const editor = {
    cargarModulos,
    addModulo,
    deleteModulo,
    cargarSubModulos,
    addSubmodulo,
    deleteSubmodulo,
    deleteSubmodulos,
}


async function cargarModulos () {
    const data: any = readLocalStorage(KEY_USER_DATA);
    const res = await editorRepository.cargarModulos(data.id_sucursal);
    return res;
}

async function addModulo (nombre:string , state: any) {
    const data: any = readLocalStorage(KEY_USER_DATA);
    const res = await editorRepository.addModulo(nombre, state, data.id_sucursal);
    return res;
}

async function deleteModulo (id:Number) {
    const res = await editorRepository.deleteModulo(id);
    return res;
}

async function cargarSubModulos (id) {
    const res = await editorRepository.cargarSubModulos(id);
    return res;
}

async function addSubmodulo (nombre:string , state: any, id_modulo:any) {
    const res = await editorRepository.addSubmodulo(nombre, state);
    const resp = await editorRepository.addSubmoduloAModulo(id_modulo.num, res.data.submoduloID);
    return resp;
}

async function deleteSubmodulo (id:Number) {
    const res = await editorRepository.deleteSubmodulo(id);
    return res;
}

async function deleteSubmodulos (ids:Number) {
    const res = await editorRepository.deleteSubmodulos(ids);
    return res;
}