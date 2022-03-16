import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/APIError';

export default class ErrorHandler {
    // Проверка на тип ошибки
    private static isOperationalError(error: APIError | Error) {
        if (error instanceof APIError) return error.isOperational;
        return false;
    }

    // Метод логирования ошибки (нужно для быстрого подключения Sentry)
    public static logError(err: APIError | Error) {
        console.log(err);
    }

    // Middleware-функция, логирует ошибку
    public static logErrorMiddleware(err: APIError | Error, req: Request, res: Response, next: NextFunction) {
        if (!ErrorHandler.isOperationalError(err)) {
            ErrorHandler.logError(err);
        }

        next(err);
    }

    // Middleware-функция Возвращает ошибку, если она операционная. Выключает сервер, если неоперационная
    public static returnError(err: APIError | Error, req: Request, res: Response, next: NextFunction) {
        res.status((err as APIError).statusCode || 500).send({
            message: ErrorHandler.isOperationalError(err) ? err.name : 'Internal server error'
        });

        if (!ErrorHandler.isOperationalError(err)) process.exit(1);
    }
}