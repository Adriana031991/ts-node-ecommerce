import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  email: { type: String, required: [true, 'El correo es obligatorio'] },
  username: { type: String, required: true },
  lastname: { type: String, required: true },
  authentication: {
    password: { type: String, required: [true, 'La contraseña es obligatoria'], select: false },
    // salt: { type: Number, select: false },
    sessionToken: { type: String, select: false },
  },
  active: { type: Boolean, required: true, default: true },
  birthday: { type: String, required: true },
  address: { type: String },
  role: { type: String, required: true, enum: ['ADMIN_ROLE', 'USER_ROLE'] },
  image: { type: String },
  createByGoogle: { type: Boolean, default: false }
});

export const UserModel = mongoose.model('Consumer', UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndUpdate(id);
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
