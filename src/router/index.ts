import express from 'express';

import authentication from './authentication';
import user from './user';
import role from './role';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  user(router);
  role(router);

  return router;
};
