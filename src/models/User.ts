import mongoose from '../connector';

// Модель пользователя. Имеет ID, логин и зашифрованный пароль

export const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    login: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

export default User;