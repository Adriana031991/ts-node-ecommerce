import mongoose from "mongoose";
import { Roles } from "../models/Roles.enum";


const UserSchema = new mongoose.Schema({
  email: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
  username: { type: String, required: true },
  lastname: { type: String, required: true },
  authentication: {
    password: { type: String, required: [true, 'La contraseña es obligatoria'], select: false },
    sessionToken: { type: String, select: false },
  },
  active: { type: Boolean, required: true, default: true },
  birthday: { type: String, required: true },
  address: { type: String },
  role: { type: String, required: true, enum: Roles },
  image: { type: String },
  createByGoogle: { type: Boolean, default: false }
});


// UserSchema.methods.toJSON
export const UserModel = mongoose.model('Consumer', UserSchema);

// User Actions
export const getUsers = (query: any, from: number, limit: number) => UserModel.find(query).skip(from).limit(limit);
export const getCoutDocuments = (query?: any) => UserModel.countDocuments(query);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = async (id: string) => { return await UserModel.findById(id); }
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = async (id: string) => { return await UserModel.findByIdAndUpdate(id, { active: false }, { new: true }); }
export const updateUserById = async (id: string, values: Record<string, any>) => { return await UserModel.findByIdAndUpdate(id, values); }


