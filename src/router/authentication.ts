import express from 'express';
import { check } from 'express-validator'
import { login, register } from '../controllers/authentication';

export default (router: express.Router) => {
  router.post('/auth/register', [check('email', 'El correo no es valido').isEmail().normalizeEmail()], register);
  router.post('/auth/login', login);
};
