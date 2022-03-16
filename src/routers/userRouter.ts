import express from 'express';
import UserController from '../controllers/UserController';

// Маршрутизатор пользователей. Описывает эндпоинты для регистрации/авторизации.

const userRouter = express.Router();

// TODO: add JOI verification
userRouter.get('/login', UserController.logIn);
userRouter.get('/signin', UserController.signIn);

export default userRouter;