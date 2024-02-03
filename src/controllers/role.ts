import express from 'express';

import * as roleSchema from '../schema/role';


// TODO: SI EL USUARIO NO ES ADMINISTRADOR NO PUEDE HACER NADA DE LOS ROLES


export const getAllRoles = async (req: express.Request, res: express.Response) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        const query = { active: true };
        const [totalRoles, roles] = await Promise.all([
            roleSchema.getRoleCount(query),
            roleSchema.getRoles(query, Number(from), Number(limit))
        ])
        return res.status(200).json({ totalRoles, roles });

    }
    catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Please contact administrative area`,
            statusCode: 400,
        })
    }
}


export const createRol = async (req: express.Request, res: express.Response) => {
    try {

        const { role } = req.body;
        await roleSchema.createRole({
            role
        });

        return res.status(201).json({
            success: true,
            message: `Role ${role} created`,
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


export const deleteRole = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const role = await roleSchema.getRoleById(id);
        if (!role) {
            return res.json({
                success: false,
                message: `Role Not found.`,
                statusCode: 404,
            })
        }
        role.active = false
        await roleSchema.deleteRoleById(id)

        return res.status(200).json({
            success: true,
            message: `Role ${role.role} deleted`,
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

export const updateRole = async (req: express.Request, res: express.Response) => {

    try {
        const { id } = req.params;
        const { role, active } = req.body;


        const roleToChange = await roleSchema.getRoleById(id);
        if (!roleToChange) {
            return res.json({
                success: false,
                message: `Role Not found.`,
                statusCode: 404,
            })
        }
        roleToChange.role = role;
        roleToChange.active = active;

        await roleSchema.updateRoleById(id, roleToChange);

        return res.status(200).json({
            success: true,
            message: `Role ${roleToChange.role} updated`,
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