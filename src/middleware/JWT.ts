import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Response } from 'express'
import { UnauthorizedErr } from '../errors';
import { AuthorizedRequest } from '../types'
import config from '../config'

// Типизация jsonwebtoken не позволяет достать поле из объекта токена, необходимо дополнить тип
interface DecodedToken extends JwtPayload {
    login: string
}

export default class JWT {
    // Middleware-функция, проверяющая токен авторизации при запросе
    public static withUserAuthentication(req: AuthorizedRequest, res: Response, next: NextFunction) {
        const currentToken = req.cookies['jwt'];
        if (!currentToken) {
            next(new UnauthorizedErr('You have to log in before you can access this website'));

            return;
        }

        try {
            // Проверка подписи токена
            const { login } = jwt.verify(currentToken, config.secret) as DecodedToken;
            // Крепим информацию о пользователе к объекту Request, чтобы можно было далее работать с этой информацией
            req.user = login;

            next();
        } catch(err) {
            const error = new UnauthorizedErr('You have to log in before you can access this website')
            next(error);
        }
    }
}