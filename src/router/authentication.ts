import express from 'express';
import { check } from 'express-validator'
import { login, register } from '../controllers/authentication';
import * as helpers from '../helpers/db_validators';
import { middlewares } from '../middlewares/index';

export default (router: express.Router) => {
  router.post('/auth/register', [
    check('username', 'Field mandatory').not().isEmpty(),
    check('password', 'Password should have more than 6 leters').isLength({ min: 6 }),
    check('email', 'Email is not validated').isEmail(),
    check('email').custom(helpers.default.existEmail),
    check('role').custom(helpers.default.isValidRole),
    middlewares.validateEmptyfields
  ], register);

  router.post('/auth/login', [
    check('email', 'Please write the email address').isEmail(),
    check('password', 'Please write the password').not().isEmpty(),
    check('email').custom(helpers.default.existEmail),
  ], login);
};
