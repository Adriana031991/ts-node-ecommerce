import express from 'express';
import { check } from 'express-validator';


import * as helpers from '../helpers/db_validators';
import { middlewares } from '../middlewares/index';
import { createRol, deleteRole, getAllRoles, updateRole } from '../controllers/role';

export default (router: express.Router) => {
    router.get('/role', getAllRoles);

    router.post('/role', [
        middlewares.validateJWT,
        middlewares.validateRoles.isAdminRole,
        check('role', 'Please write the name of role in mayus separate by _ without spaces').not().isEmpty(),
        check('role').custom(helpers.default.existRole),
        middlewares.validateEmptyfields
    ], createRol);

    router.patch('/role/:id', [
        middlewares.validateJWT,
        middlewares.validateRoles.isAdminRole,
        check('id', 'Is not a valid ID').isMongoId(),
        check('id').custom(helpers.default.existRoleById),
    ], deleteRole);


    router.put('/role/:id', [
        middlewares.validateJWT,
        middlewares.validateRoles.isAdminRole,
        check('id', 'Is not a valid ID').isMongoId(),
        check('id').custom(helpers.default.existRoleById),
        middlewares.validateEmptyfields
    ], updateRole);
};
