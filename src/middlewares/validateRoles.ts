
import { Request, Response, NextFunction } from 'express';
import { getUserBySessionToken } from '../schema/user';
import { merge, } from 'lodash';
import { Roles } from '../models/Roles.enum';

const isAdminRole = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies['USER-AUTH'];

        if (!token) {
            return res.status(403).json({
                msg: 'User not authenticated'
            });
        }

        const existingUser = await getUserBySessionToken(token);

        if (!existingUser) {
            return res.json({
                success: false,
                message: `User not authenticated`,
                statusCode: 403,
            })
        }
        if (!existingUser.active) {
            return res.json({
                success: false,
                message: `User not active, therefore not have permision`,
                statusCode: 500,
            })
        }
        if (existingUser.role != Roles[0]) {
            return res.json({
                success: false,
                message: `User not have permision for this  action`,
                statusCode: 401,
            })
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'User without permisions please talk to your administrative'
        })
    }


};





export default { isAdminRole };

