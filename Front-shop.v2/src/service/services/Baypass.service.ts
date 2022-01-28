import { baypassRepository } from "../repositories/Baypass.repository";

export const baypassService = {
   PostBaypass,
};
async function PostBaypass (baypass) {
   const user= await baypassRepository.PostBaypass(baypass);
   return user
}
