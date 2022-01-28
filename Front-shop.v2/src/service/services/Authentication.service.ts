import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import {
   readLocalStorage,
   removeLocalStorage,
   saveLocalStorage
} from '@helpers/local-storage-helper';
import {
   KEY_ARRAY_MY_MENU,
   KEY_EMPRESA,
   KEY_OBJECT_MY_MENU,
   KEY_TOOGLE_MENU,
   KEY_USER_DATA
} from '@constants/local-storage';
import { APP_AUTHORIZE_KEY } from '@defaults/app';
//import { STATIC_ROUTERS } from '@defaults/static-routers';
//import { ROLE_SUPER_ADMIN, ROLE_ADMIN, ROUTES_FOR_SUPER_ADMIN, ROUTES_FOR_ADMIN, ROLE_SUPERVISOR, ROUTES_FOR_SUPERVISOR} from '@defaults/static-roles';
//import { MAIN_REDIRECT_FOR_SUPER_ADMIN, MAIN_REDIRECT_FOR_ADMIN} from '@defaults/static-roles';
import { removeAuthCookie, setAuthCookie, readAuthCookie } from '@helpers/cookie.helper';
import { authenticationRepository } from '../repositories/Authentication.repository';
import { Authentication } from '../models/Authentication';

const currentUserSubject = new BehaviorSubject<Authentication | null>(init());

export const authenticationService = {
   login,
   logout,
   end,
   loginFake,
   authCookie: readAuthCookie,
   currentUser: currentUserSubject.asObservable(),
   get currentUserValue () { return currentUserSubject.value }
};

function init() {
   const auth: Authentication = readLocalStorage(KEY_USER_DATA);
   axios.defaults.headers.common[APP_AUTHORIZE_KEY] = auth?.token || '';
   return auth;
}
function end() {
   removeLocalStorage(KEY_USER_DATA);
   removeLocalStorage(KEY_ARRAY_MY_MENU);
   removeLocalStorage(KEY_OBJECT_MY_MENU);
   removeLocalStorage(KEY_TOOGLE_MENU);
   removeAuthCookie();
   axios.defaults.headers.common[APP_AUTHORIZE_KEY] = null;
   currentUserSubject.next(null);
}

async function loginFake(username: string, password: string,rut: string) : Promise<any> {
   return await authenticationRepository.loginSoftnet(username,rut,password)
}

function createExpireToken( s: number ): Date {
   let now = new Date();
   let time = now.getTime();
   var expireTime = time + 1000*s;
   now.setTime(expireTime);
   return now
}

async function login(user_nick: string, rut_empresa: string, password: string) : Promise<Authentication> {
   try {
      const login = await authenticationRepository.loginSoftnet(user_nick, rut_empresa, password);
      console.log(login)
      if (!!login.error) {
         return {
            user  : null,
            token : '',
            error : login.error
         }
      }

      // if (!!login.message) {
      //    return {
      //       user  : null,
      //       token : '',
      //       message : login.message
      //    }
      // }

      const access_token = `${login.token || ''}`;
      //const access_token = `${login.data?.token_type || ''} ${login.data?.token || ''}`;
      axios.defaults.headers.common[APP_AUTHORIZE_KEY] = access_token;

      //const auth = await authenticationRepository.profile(login.data.access_token);
      const auth = await authenticationRepository.dataUser(access_token);
        // const empresa = await authenticationRepository.dataEmpresa(access_token);
      //const expire_time = login.data?.expires_in ? createExpireToken(login.data?.expires_in) : 0;

      // if (!!auth.error) {
      //    return {
      //       user  : null,
      //       token : '',
      //       error : auth.error
      //    }
      // }
      // console.log("ROLE",auth.user.role )
      // let role: string = auth.user.role || '';
      // let routesRules: any = [],
      // mainRedirect: any,
      // modules = [];

      // if(role == ROLE_ADMIN){
      //    routesRules = ROUTES_FOR_ADMIN;
      //    mainRedirect = MAIN_REDIRECT_FOR_ADMIN;
      // }
      // if(role == ROLE_SUPERVISOR){
      //    routesRules = ROUTES_FOR_SUPERVISOR;
      //    mainRedirect = MAIN_REDIRECT_FOR_ADMIN;
      // }

      // auth.user.main_redirect = mainRedirect;
      // console.log("REDIRECT",auth.user.main_redirect)

      // STATIC_ROUTERS.forEach( module => {
      //    console.log(module)
      //    routesRules.forEach((route: {module: string, navigators: []}) => {
      //       if (route.module === module.route) {
      //          modules.push({
      //             ...module,
      //             "route-navigators": route.navigators
      //          })
      //       }
      //    })
      // });
      // console.log(modules)
      // saveLocalStorage(KEY_ARRAY_MY_MENU, modules);
      
      saveLocalStorage(KEY_USER_DATA, auth);
      saveLocalStorage(KEY_TOOGLE_MENU, true);

      if(!!login.token) {
         setAuthCookie(access_token, undefined);
        // setAuthCookie(access_token, expire_time === 0 ? undefined: { expires: expire_time });
         currentUserSubject.next(auth);
      }

      if(!!login.token) {
         currentUserSubject.next(login);
      }
      const authResponse = {...auth, data: login.data};
      
      console.log(authResponse.id_sucursal);
      //registrar "empresa" si no existe
      const ayuda = authenticationRepository.registro(authResponse.id_sucursal,authResponse.nombre,authResponse.rut_usuario,'efectivo',1)
      console.log(ayuda);
      return authResponse;

   } catch (e) {
      return {
         user: null, token: '', error: { code: 0, message: 'Error en obtener permisos' }
      }
   }
}


async function logout() {
   const rpta = await authenticationRepository.logout();
   if (!rpta.error) {
      end();
   }
   return rpta;
}
