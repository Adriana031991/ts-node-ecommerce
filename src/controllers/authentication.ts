import express from 'express';

import { getUserByEmail, createUser } from '../schema/user';
import { comparePasword, encryptPassword } from '../helpers/encryptPassword';
import { generateJWT } from '../helpers/generate_jwt';


export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email).select('+authentication.password');

    if (user) {

      const validPassword = await comparePasword(password, user.authentication?.password);

      if (!validPassword) {
        return res.status(400).json({
          msg: 'User or Password incorrect'
        });
      }

      user.authentication!.sessionToken = await generateJWT(user!.id);

      await user.save();

      res.cookie('USER-AUTH', user!.authentication?.sessionToken, { domain: 'localhost', path: '/' });
    }

    return res.status(200).json(user).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {

  try {
    const { email, password, username, ...data } = req.body;

    const user = await createUser({
      email,
      username,
      authentication: {
        password: await encryptPassword(password),
      },
      ...data
    });

    return res.status(201).json({
      success: true,
      message: `The user ${user?.username} has been created`,
    }).end();

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: `Please contact to your administrative with this error: ${error}.`,

    })
  }
}