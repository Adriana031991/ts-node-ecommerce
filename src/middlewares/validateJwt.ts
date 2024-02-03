import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, } from 'express';
import { KEY_JWT } from '../config/config';
import { getUserById } from '../schema/user';

import { merge, } from 'lodash';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies['USER-AUTH'];

        if (!token) {
            return res.status(403).json({
                msg: 'User not authenticated'
            });
        }

        const uid = jwt.verify(token, KEY_JWT) as jwt.JwtPayload;

        const user = await getUserById(uid['uid'] as string);


        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token: user does not exist DB'
            })
        }


        // req.user = user;
        merge(req, { identity: user });
        return next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Invaled Token'
        })
    }

}



export default validateJWT