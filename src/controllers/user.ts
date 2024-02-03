import express from 'express';

import { getUsers, getUserById, updateUserById, getCoutDocuments, deleteUserById } from '../schema/user';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {

    const { limit = 5, from = 0 } = req.query;
    const query = { active: true };

    const [totalUsers, users] = await Promise.all([
      getCoutDocuments(query),
      getUsers(query, Number(from), Number(limit))
    ])

    return res.status(200).json({ totalUsers, users });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: `Please contact administrative area`
    })
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    user!.active = false

    deleteUserById(id)

    return res.status(204).json({
      success: true,
      message: `The user ${user?.username} has been deleted`,
    }).end();



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
    const { id } = req.params;
    const { username, lastname, birthday, role } = req.body;

    const userToChange = await getUserById(id);
    if (!userToChange) {
      return res.json({
        success: false,
        message: `User Not found.`,
        statusCode: 404,
      })
    }
    userToChange.username = username;
    userToChange.lastname = lastname;
    userToChange.role = role;
    userToChange.birthday = birthday;

    updateUserById(id, userToChange);

    return res.status(204).json({
      success: true,
      message: `The user ${userToChange?.username} has been updated`,
    }).end();

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: `Please get sure that all attributes to change are correct or contact to administrative area`,
      statusCode: 400,
    })
  }
}

