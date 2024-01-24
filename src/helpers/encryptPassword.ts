// import crypto from 'crypto';

// const SECRET = 'USER-REST-API';

// export const authentication = (salt: string, password: string): string => {
//   return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
// }

// export const random = () => crypto.randomBytes(128).toString('base64');

// ----/////////////////////////--------------------------------------------//////////////////////////////
// import bcrypt from 'bcrypt';
// interface EncryptionConfig {
//   saltRounds: number;
// }

// const generateSalt = (config: EncryptionConfig): string => {
//   return bcrypt.genSaltSync(config.saltRounds);
// };

// const generateHash = async (password: string, salt: string): Promise<string> => {
//   return bcrypt.hashSync(password, salt);
// };


import { genSaltSync, hashSync } from "bcrypt";
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = genSaltSync();
  const hash = hashSync(password, salt);
  return hash;
};
