import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
// import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users', getAllUsers);
  router.patch('/users/:id', deleteUser);
  router.put('/users/:idAdmin/update', updateUser);
};
