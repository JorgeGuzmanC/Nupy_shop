import { ApiDTO } from './ApiDTO';

export interface LoginDTO extends ApiDTO {
   token: string,
   errors?: any | null,
   message: string,
   timestamp: string
}

export type LogoutDTO = undefined | ApiDTO

export type Sucursal= {
   id: number,
   nombre: string,
   direccion: string,
   comuna: string,
   ciudad: string
}

export interface UserDTO extends ApiDTO {
   data?: {
      rut_usuario: string,
      nombre: string,
      usuario: string,
      id_sucursal: number,
      email: string,
      cajero: number,
      admin: number,
      sucursal: Sucursal
   }
}
