import express from 'express';

import { getUsers, getUserById, updateUserById } from '../models/users';


export const getAllUsers = async (_: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: `Please contact administrative area`,
      statusCode: 400,
    })
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({
        success: false,
        message: `User Id is required.`,
        statusCode: 400,
      })
    }
    const user = await getUserById(id);
    if (!user) {
      return res.json({
        success: false,
        message: `User Not found.`,
        statusCode: 404,
      })
    }

    user.active = false
    await user.save();

    return res.status(200).json(user).end();


  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: `Please contact administrative area`,
      statusCode: 400,
    })
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {

  try {
    const { idAdmin } = req.params;
    const { username, active, id } = req.body;

    const firstUser = await getUserById(idAdmin);

    if (!firstUser || !firstUser.active) {
      return res.json({
        success: false,
        message: `User inactive.`,
        statusCode: 400,
      })
    }

    if (!id || !username) {
      return res.json({
        success: false,
        message: `User data is required: name and id.`,
        statusCode: 400,
      })
    }

    const userToChange = await getUserById(id);
    if (!userToChange) {
      return res.json({
        success: false,
        message: `User Not found.`,
        statusCode: 404,
      })
    }
    userToChange.username = username;
    userToChange.active = active;

    await updateUserById(id, userToChange);

    return res.status(200).json(userToChange).end();

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: `Please get sure that all attributes to change are correct or contact to administrative area`,
      statusCode: 400,
    })
  }
}