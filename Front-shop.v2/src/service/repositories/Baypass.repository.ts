import { http } from "../http/http";

export const baypassRepository = {
   // getUser: async (idToken: string) => {
   //    const user = await http.post('http://localhost/login22', JSON.stringify({'token': idToken }) )
   //    return user
   // },
   PostBaypass: async (baypass): Promise<any> => {
      const user = await http.post<any>(`https://bypass.doopy.cl/api/formularios?RUT=${baypass.RUT}&telefono=${baypass.telefono}&correo=${baypass.correo}&pagina=${baypass.pagina}` )
      //const {data,error,message} = user
      return {
         // data: (data||[]).map((dt) => ({
         //    email: dt.email,
         //    password: dt.password
         // })),
         // error,
         user
         // message
      };
   },
}
