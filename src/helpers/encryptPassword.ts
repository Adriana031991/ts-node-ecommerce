// import crypto from 'crypto';

// const SECRET = 'USER-REST-API';

// export const authentication = (salt: string, password: string): string => {
//   return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
// }

// export const random = () => crypto.randomBytes(128).toString('base64');

// ----/////////////////////////--------------------------------------------//////////////////////////////


import { genSaltSync, hashSync, compareSync } from "bcrypt";
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = genSaltSync();
  const hash = hashSync(password, salt);
  return hash;
};
export const comparePasword = async (pasword: string, paswordUser: string | undefined): Promise<boolean> => {
  if (!paswordUser) throw new Error("No password provided");
  return compareSync(pasword, paswordUser)
}