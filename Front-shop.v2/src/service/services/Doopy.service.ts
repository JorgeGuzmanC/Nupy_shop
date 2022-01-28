import { doopyRepository } from "../repositories/Doopy.repository";

export const doopyService = {
   loginDoopy,
   registerDoopy,
   ipPermisedSA,
   blockedIpPermisedSA,
   ipDeniedSA,
   permisedIpDeniedSA,
   ipPermised,
   blockedIpPermised,
   ipDenied,
   permisedIpDenied
};
async function loginDoopy (login) {
   const resp= await doopyRepository.login(login);
   return resp
}

async function registerDoopy (register) {
   const resp= await doopyRepository.register(register);
   return resp
}

/*SUPER ADMIN*/
async function ipPermisedSA () {
   const resp= await doopyRepository.ipPermisedSuperAdmin();
   return resp
}

async function blockedIpPermisedSA (ip,nick) {
   const resp= await doopyRepository.blockedIpPermisedSuperAdmin(ip,nick);
   return resp
}

async function ipDeniedSA () {
   const resp= await doopyRepository.ipDeniedSuperAdmin();
   return resp
}

async function permisedIpDeniedSA (ip,nick) {
   const resp= await doopyRepository.permisedIpDeniedSuperAdmin(ip,nick);
   return resp
}

/*ADMIN*/

async function ipPermised () {
   const resp= await doopyRepository.ipPermisedAdmin();
   return resp
}

async function blockedIpPermised (ip,nick) {
   const resp= await doopyRepository.blockedIpPermisedAdmin(ip,nick);
   return resp
}

async function ipDenied () {
   const resp= await doopyRepository.ipDeniedAdmin();
   return resp
}

async function permisedIpDenied (ip,nick) {
   const resp= await doopyRepository.permisedIpDeniedAdmin(ip,nick);
   return resp
}

