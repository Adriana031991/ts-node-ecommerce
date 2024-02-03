import mongoose from "mongoose";


const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    active: { type: Boolean, required: true, default: true },
})

export const RoleModel = mongoose.model('Role', RoleSchema);

export const getRoleByRole = (role: string) => RoleModel.findOne({ role });
export const getRoles = (query: any, from: number, limit: number) => RoleModel.find(query).skip(from).limit(limit);
export const getRoleCount = (query?: any) => RoleModel.countDocuments(query);
export const createRole = (values: Record<string, any>) => new RoleModel(values).save().then((role) => role.toObject());

export const getRoleById = (id: string) => RoleModel.findById(id);
export const deleteRoleById = (id: string) => RoleModel.findByIdAndUpdate(id, { active: false }, {    new: true});
export const updateRoleById = (id: string, values: Record<string, any>) => RoleModel.findByIdAndUpdate(id, values);

