import { http } from '../http/http';
import { API_URL_BASE, APP_API_LOYVERSE_URL } from '@toolbox/defaults/app';
import { SalesDTO, SalePostDTO } from '../http/dto/SaleDTO';
import { DataSale, SalesPost } from '../models/Sale'
import { async } from 'rxjs';

export const saleRepository = {
   getSales: async (params: any, id:number): Promise<any> => {
      const contact = await http.get<SalesDTO>
      (`${APP_API_LOYVERSE_URL}/api/ventas/ventas-por-estado?key=${params.key}&usuario=${params.usuario}&clave=${params.clave}&rut=${params.rut}&status=${id}`)
      //const { data, error, message } = contact;
      return {
         contact
         // data,
         // error,
         // message
      }
   },

   getCambioEstado: async (params: any,idData:any, id:number): Promise<any> => {
      const cambioEstado = await http.get<any>
      (`${APP_API_LOYVERSE_URL}/api/ventas/marcarventa-status?key=${params.key}&id=${idData}&status=${id}`)
      //const { data, error, message } = contact;
      return {
         cambioEstado
         // data,
         // error,
         // message
      }
   },
  // http://loyverse.us-west-2.elasticbeanstalk.com/api/ventas/marcarventa-status?key=azureservicemap&id=6187000a1def320f71deac13&status=2


   markSaleIssued: async (id, payload): Promise<any> => {
      const resp = await http.post<any>(`${APP_API_LOYVERSE_URL}/api/ventas/marcarventa?key=azureservicemap`, {
         id: id,
         payload: payload,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   getAreaNegocio,
   getBodega,
   getTipoPagos,
   enviarBoleta,
   getBoleta,
}

function getAreaNegocio(token) {
   return fetch(`${API_URL_BASE}/areaNegocio`, {
   method: 'GET',
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: token,
   },
   })
   .then(area => area.json())
   .then(area => {
      return area;
   })
   .catch(error => {
      return null;
   })
}

// function getTimbre(timbre) {
//    return fetch(`${timbre}`, {
//    method: 'GET',
//    headers: {
//       'Content-Type': 'application/json',
//    },
//    })
//    .then(resp => resp.json())
//    .then(resp => {
//       return resp;
//    })
//    .catch(error => {
//       return null;
//    })
// }

function getBodega(token) {
   return fetch('http://api.softnet.cl/bodega', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
   })
     .then(bod => bod.json())
     .then(bod => {
       return bod;
     })
     .catch(error => {
       return null;
     })
 }

 function getTipoPagos(token) {
   return fetch('http://api.softnet.cl/formaPago', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
   })
     .then(bod => bod.json())
     .then(bod => {
       return bod;
     })
     .catch(error => {
       return null;
     })
 }
function enviarBoleta(token, boleta){
   return fetch('http://api.softnet.cl/boleta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: token,
      },
      body: JSON.stringify(boleta),
    })
      .then(pros => pros.json())
      .then(async pros => {
        return pros
     //   this.setState({ folio: pros[0].folio })
      })
        // const guardarpedidomongo =
}

function getBoleta(token, datosBoleta) {
   return fetch('http://api.softnet.cl/consultaDocumento', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
     body: JSON.stringify(datosBoleta),
   })
     .then(bod => bod.json())
     .then(bod => {
       return bod;
     })
     .catch(error => {
       return null;
     })
 }


