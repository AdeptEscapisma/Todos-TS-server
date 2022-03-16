import { NextFunction, Response } from "express";
import TodosService from "../services/TodosService";
import { AuthorizedRequest, HttpStatus } from "../types";

export default class TodosController {
    public static async createTodo(req: AuthorizedRequest, res: Response, next: NextFunction) {
        try {
            const { description } = req.body;
            const response = await TodosService.createTodo(req.user, description)

            res.status(HttpStatus.ok).send(response);
        } catch (err) {
            next(err);
        }
    }

    public static async getTodos(req: AuthorizedRequest, res: Response, next: NextFunction) {
        try {
            const response = await TodosService.getTodos(req.user);

            res.status(HttpStatus.ok).send(response);
        } catch (err) {
            next(err);
        }
    }

    public static async updateTodo(req: AuthorizedRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { description } = req.body;
            const response = await TodosService.updateTodo(id, req.user, description);

            res.status(HttpStatus.ok).send(response);
        } catch (err) {
            next(err);
        }
    }

    public static async markTodo(req: AuthorizedRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const response = await TodosService.markTodo(id, req.user);

            res.status(HttpStatus.ok).send(response);
        } catch (err) {
            next(err);
        }
    }

    public static async markAllTodos(req: AuthorizedRequest, res: Response, next: NextFunction) {
        try {
            const response = await TodosService.markAllTodos(req.user);

            res.status(HttpStatus.ok).send(response);
        } catch (err) {
            next(err);
        }
    }

    public static async deleteTodo(req: AuthorizedRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const response = await TodosService.deleteTodo(id, req.user);

            res.status(HttpStatus.ok).send(response);
        } catch (err) {
            next(err);
        }
    }

    public static async deleteMarkedTodos(req: AuthorizedRequest, res: Response, next: NextFunction) {
        try {
            const response = await TodosService.deleteMarkedTodos(req.user);

            res.status(HttpStatus.ok).send(response);
        } catch (err) {
            next(err);
        }
    }
}