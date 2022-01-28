import { http } from '../http/http';
import { UserDetailsDTO,UserDTO,UserPost,UserRequestPost, UsersDTO} from '../http/dto/UserDTO';
import { UserDetails, Users } from '../models/User';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { User } from '../models/User';

export const userRepository = {
   // getUser: async (idToken: string) => {
   //    const user = await http.post('http://localhost/login22', JSON.stringify({'token': idToken }) )
   //    return user
   // },
   getUser: async (): Promise<User> => {
      const user = await http.get<UserDTO>(`${API_URL_BASE}/v1/account` )
      const {data,error,message} = user
      return {
         data: (data||[]).map((dt) => ({
            email: dt.email,
            password: dt.password
         })),
         error,
         message
      };
   },
}
