import express, { Express } from "express";
import { Server as HttpServer } from 'http'
import cookieParser from 'cookie-parser'
import router from "./routers";
import ErrorHandler from "./middleware/ErrorHandler";

class Server {
    private app: Express;
    private server: HttpServer;

    constructor() {
        this.app = express();
        // Сервер принимает данные в форматах url-encoded и json
        this.app.use(express.urlencoded({ extended: true })).use(express.json());
        // Библиотека cookie-parser считывает куки с заголовка и добавляет их в req.cookies
        this.app.use(cookieParser())

        this.boot();
    }

    private boot() {
        // Запуск маршрутизации
        this.setUpApiRouters();

        this.server = this.app.listen(8000, () => {
            console.log('Server runs on port', 8000);
        });
    }

    private setUpApiRouters() {
        // Подключение маршрутизатора и обработчика ошибок
        this.app.use('/api', router);
        this.app.use(ErrorHandler.logErrorMiddleware);
        this.app.use(ErrorHandler.returnError);
    }

    public getApp() {
        return this.app;
    }

    public stopApp() {
        this.server.close();
    }
}

export const app = new Server();