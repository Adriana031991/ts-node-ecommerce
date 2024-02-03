import express from 'express';
import { check } from 'express-validator';


import { getAllUsers, deleteUser, updateUser } from '../controllers/user';
import * as helpers from '../helpers/db_validators';
import { middlewares } from '../middlewares/index';

export default (router: express.Router) => {
  router.get('/users', getAllUsers);

  router.patch('/users/:id', [
    middlewares.validateJWT,
    middlewares.validateRoles.isAdminRole,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(helpers.default.existUser),
  ], deleteUser);


  router.put('/users/:id', [
    middlewares.validateJWT,
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(helpers.default.existUser),
    check('id').custom(helpers.default.isUserActive),
    check('role').custom(helpers.default.isValidRole),
    middlewares.validateEmptyfields
  ], updateUser);
};
