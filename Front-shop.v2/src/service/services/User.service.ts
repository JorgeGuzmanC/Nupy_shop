import { userRepository } from "../repositories/User.repository";

export const userService = {
   getUser,
};
async function getUser () {
   const user= await userRepository.getUser();
   return user
}
