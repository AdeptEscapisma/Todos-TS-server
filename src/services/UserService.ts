import { nanoid } from "nanoid";
import Crypto from "../utils/Crypto";
import { BadRequestErr } from "../errors";
import UserRepository from "../repositories/UserRepository";

// Сервис пользователей. Здесь описана бизнес-логика сервера по регистрации и авторизации пользователей.

export default class UserService {
    public static async signIn(login: string, password: string) {
        const existingUser = await UserRepository.findUser(login);

        if (existingUser) {
            throw new BadRequestErr('User with this login already exists');
        }

        const id = nanoid();
        const { hash, salt } = Crypto.setPassword(password);
        await UserRepository.addUser(id, login, hash, salt);

        return;
    }

    public static async logIn(login: string, password: string) {
        const existingUser = await UserRepository.findUser(login);
        if (!existingUser) {
            throw new BadRequestErr('User with this login does not exists');
        }
    
        const { hash, salt } = existingUser;
        if (!Crypto.verifyPassword(password, hash, salt)) {
            throw new BadRequestErr('Invalid password');
        }
    
        return;
    }
}