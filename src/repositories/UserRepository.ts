import User from "../models/User";

// Репозиторий пользователей. Здесь описывается работа с базой данных при регистрации/авторизации.

export default class UserRepository {
    public static async findUser(login: string) {
        const user = await User.findOne({ login });

        return user;
    }

    public static async addUser(id: string, login: string, hash: string, salt: string) {
        const user = await User.create({ id, login, hash, salt });
        
        return user;
    }
}