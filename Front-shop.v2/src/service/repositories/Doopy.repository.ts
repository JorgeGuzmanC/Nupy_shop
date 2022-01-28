import { KEY_RUT } from "@/toolbox/constants/local-storage";
import { readLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { async } from "rxjs";
import { http } from "../http/http";

export const doopyRepository = {

   login: async (login): Promise<any> => {
      const resp = await http.post<any>(`
      https://login.softnet.cl/api/login?rut=${login.rut}&nick=${login.nick}&password=${login.password}` )
      return {
         resp
      };
   },

   register: async (register): Promise<any> => {
      const resp = await http.post<any>(`
      https://login.softnet.cl/api/register?nick=${register.nick}&rut=${register.rut}&password=${register.password}&user=${register.user}&idtiporol=${register.idtipo}` )
      return {
         resp
      };
   },

   /* PARA LOS SUPER-ADMIN*/
   ipPermisedSuperAdmin: async () : Promise<any> => {
      const resp = await http.get<any>(
         `https://login.softnet.cl/api/acces`
      )
      return{
         resp
      };
   },

   blockedIpPermisedSuperAdmin: async (ip,nick) : Promise<any> => {
      const resp = await http.post<any>(
         `https://login.softnet.cl/api/acces?ingreseip=${ip}&nickuser=${nick}`
      )
      return{
         resp
      }
   },

   ipDeniedSuperAdmin : async () : Promise<any> => {
      const resp = await http.get<any>(
         `https://login.softnet.cl/api/denied`
      )
      return{
         resp
      };
   },

   permisedIpDeniedSuperAdmin : async (ip,nick) : Promise<any> => {
      const resp = await http.post<any>(
         `https://login.softnet.cl/api/denied?ingreseip=${ip}&nickuser=${nick}`
      )
      return{
         resp
      }
   },

   /*PARA LOS ADMIN */

   ipPermisedAdmin: async () : Promise<any> => {
      const rut = readLocalStorage(KEY_RUT)
      const resp = await http.get<any>(
         `https://login.softnet.cl/api/accesUser?ingreserut=${rut}`
      )
      return{
         resp
      };
   },

   blockedIpPermisedAdmin: async (ip,nick) : Promise<any> => {
      const resp = await http.post<any>(
         `https://login.softnet.cl/api/accesUser?ingreseip=${ip}&nickuser=${nick}`
      )
      return{
         resp
      }
   },

   ipDeniedAdmin : async () : Promise<any> => {
      const rut = readLocalStorage(KEY_RUT)
      const resp = await http.get<any>(
         `https://login.softnet.cl/api/deniedUser?ingreserut=${rut}`
      )
      return{
         resp
      };
   },

   permisedIpDeniedAdmin : async (ip,nick) : Promise<any> => {
      const resp = await http.post<any>(
         `https://login.softnet.cl/api/deniedUser?ingreseip=${ip}&nickuser=${nick}`
      )
      return{
         resp
      }
   },
}
