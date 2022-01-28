import { saleRepository } from "../repositories/Sale.repository";

export const saleService = {
   getSales,
   markSaleIssued,
   getCambioEstado,
   getAreaNegocio,
   getBodega,
   getTipoPagos,
   enviarBoleta,
   getBoleta,
};

function getSales(params: any, id:number) {
   return saleRepository.getSales(params, id);
}
function getCambioEstado(params: any,idData:any, id:number) {
   return saleRepository.getCambioEstado(params,idData, id);
}
function markSaleIssued(id, payload) {
   return saleRepository.markSaleIssued(id, payload)
}
function getAreaNegocio(token) {
   return saleRepository.getAreaNegocio(token)
}

function getBodega(token) {
   return saleRepository.getBodega(token)
}

function getTipoPagos(token) {
   return saleRepository.getTipoPagos(token)
}
function enviarBoleta(token, boleta){
   return saleRepository.enviarBoleta(token, boleta);
}
function getBoleta(token,datosBoleta){
   return saleRepository.getBoleta(token,datosBoleta)
}

