import { Status } from "./ApiModel";

export type Sucursal= {
   id: number,
   nombre: string,
   direccion: string,
   comuna: string,
   ciudad: string
}

export type User = {
   rut_usuario: string,
   nombre: string,
   usuario: string,
   id_sucursal: number,
   email: string,
   cajero: number,
   admin: number,
   sucursal: Sucursal
}

export interface Login {
   token: string,
   message: string,
   status: Status,
   error: Status
}

export interface Logout {
   message?: string,
   status?: Status,
   error?: Status
}

export interface Authentication {
   user?: User | null | undefined,
   data?: {
      token: string
   },
   token: string,
   error?: Status
}
