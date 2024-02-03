import { getRoleById, getRoleByRole } from '../schema/role'
import { getUserByEmail, getUserById } from '../schema/user'

const isValidRole = async (role = '') => {

    const existRole = await getRoleByRole(role);
    if (!existRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}
const existRole = async (role = '') => {

    const existRole = await getRoleByRole(role);
    if (existRole) {
        throw new Error(`El rol ${role} está registrado en la BD`);
    }
}

const existRoleById = async (id: string) => {

    const existRole = await getRoleById(id);
    if (!existRole) {
        throw new Error(`El rol con id ${id} no existe`);
    }
}

const existEmail = async (email: string = '') => {

    const existEmail = await getUserByEmail(email);
    if (existEmail) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
}

const existUser = async (id: string) => {

    const userExists = await getUserById(id);
    if (!userExists) {
        throw new Error(`El id no existe ${id}`);
    }
}

const isUserActive = async (id: string) => {
    const userState = await getUserById(id);
    if (!userState || !userState.active) {
        throw new Error(`El usuario no esta activo`);
    }
}


export default {
    isValidRole,
    existRole,
    existRoleById,
    existEmail,
    existUser,
    isUserActive
}

