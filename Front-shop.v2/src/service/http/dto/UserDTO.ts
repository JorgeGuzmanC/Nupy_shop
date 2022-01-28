import { ApiDTO } from './ApiDTO';

export interface UserDTO extends ApiDTO {
   data: DataUser[];
}

export type DataUser = {
   email: string;
   password: string;
}

// List of UsersDTO

export interface UsersDTO extends ApiDTO {
   data: DataUsers[];
}

export type Sucursal= {
   id: number,
   nombre: string,
   direccion: string,
   comuna: string,
   ciudad: string
}

export type DataUsers = {
   rut_usuario: string,
   nombre: string,
   usuario: string,
   id_sucursal: number,
   email: string,
   cajero: number,
   admin: number,
   sucursal: Sucursal
}

export interface UserRequestPost extends ApiDTO {
   data: UserPost
}

export type UserPost = {
   idtipousuario: number,
   nombre: string,
   email: string,
   password: string,
   role: string;
}

// User Details

export interface UserDetailsDTO extends ApiDTO {
   data: Data;
}

export type Data = {
   rut_usuario: string,
   nombre: string,
   usuario: string,
   id_sucursal: number,
   email: string,
   cajero: number,
   admin: number,
   sucursal: Sucursal
}
