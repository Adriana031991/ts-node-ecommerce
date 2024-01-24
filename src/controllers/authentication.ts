import express from 'express';

import { getUserByEmail, createUser } from '../models/users';
import { encryptPassword } from '../helpers/encryptPassword';


export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please write the email address and password.`,

      })
    }

    const user = await getUserByEmail(email).select('+authentication.password');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `A user with email ${email} Not exists. Please choose a different email address.`,

      })
    }

    const expectedHash = await encryptPassword(password);

    if (user.authentication?.password != expectedHash) {
      return res.status(403).json({
        success: false,
        message: `Not authenticated.`,

      })
    }

    user.authentication.sessionToken = await encryptPassword(user._id.toString());

    await user.save();

    res.cookie('USER-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {

  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: `Please write the email address and password.`,

      })
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `A user with email ${email} already exists. Please choose a different email address.`,

      })
    }

    const user = await createUser({
      email,
      username,
      authentication: {
        password: await encryptPassword(password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: `Please contact to your administrative with this error: ${error}.`,

    })
  }
}