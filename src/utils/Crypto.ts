// Класс-утилита для шифрования и проверки паролей пользователей
import crypto from 'crypto'

// Вспомогательный класс для шифровки/дешифровки паролей

export default class Crypto {
    public static setPassword(password: string) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return { hash, salt };
    }

    public static verifyPassword(password: string, hash: string, salt: string) {
        const encodedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return hash === encodedPassword;
    }
}