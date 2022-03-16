import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { HttpStatus } from "../types";
import UserService from "../services/UserService";

// Контроллер пользователей.
// Здесь описана работа с запросами по регистрации и авторизации пользователей.
// В этом слое можно организовать работу по верификации входящих данных, но в данном примере это реализовано с помощью библиотеки JOI.
// (Библиотека для middleware-функций верификации по заданным схемам)
// Здесь же необходимо отсылать JWT, чтобы у пользователя был доступ к защищенным эндпоинтам сервера
// (В данном примере - всё, что связано со списком задач, т.к. он персональный для каждого пользователя)

export default class UserController {
    // Метод для создания Cookie с подписанным JWT, в котором хранится информация об авторизации
    private static getCookie(login: string) {
        const accessToken = jwt.sign({ login }, config.secret, {
            expiresIn: config.tokenLifetime
        });

        return accessToken;
    }

    // Регистрация
    public static async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, password } = req.body;
            await UserService.signIn(login, password);

            res.cookie('jwt', UserController.getCookie(login));

            res.sendStatus(HttpStatus.ok);
        } catch (err) {
            next(err);
        }
    }

    // Авторизация
    public static async logIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, password } = req.body;
            await UserService.logIn(login, password);

            res.cookie('jwt', UserController.getCookie(login));

            res.sendStatus(HttpStatus.ok);
        } catch (err) {
            next(err);
        }
    }
}