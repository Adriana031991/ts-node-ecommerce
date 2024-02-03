
import * as jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, KEY_JWT } from '../config/config';

export const generateJWT = async (uid: string = '') => {

    return new Promise<string>((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, KEY_JWT, {
            expiresIn: JWT_EXPIRES_IN
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Token was not generate. Please contact to your administrative')
            } else {
                resolve(token ? token : '');
            }
        })

    })
}

