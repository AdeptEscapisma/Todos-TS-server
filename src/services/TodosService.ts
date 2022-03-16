import { nanoid } from "nanoid";
import { BadRequestErr } from "../errors";
import TodosRepository from "../repositories/TodosRepository";

export interface Todo {
    _id: string,
    id: string, 
    user: string,
    description: string,
    isCompleted: boolean
}

export default class TodosService {
    public static async createTodo(user: string, description: string) {
        const id = nanoid();
        const todo = await TodosRepository.createTodo(id, user, description);

        return todo;
    }

    public static async getTodos(user: string) {
        const todos = await TodosRepository.getTodos(user);

        return todos;
    }

    public static async updateTodo(id: string, user: string, description: string) {
        const todo = await TodosRepository.getTodo(id, user);
        if (!todo) throw new BadRequestErr('Cannot find todo')

        const newTodo = await TodosRepository.updateTodo(id, user, description);
        return newTodo;
    }

    public static async markTodo(id: string, user: string) {
        const todo = await TodosRepository.getTodo(id, user);
        if (!todo) throw new BadRequestErr('Cannot find todo');

        const { isCompleted } = todo;

        const newTodo = await TodosRepository.markTodo(id, user, !isCompleted);
        return newTodo;
    }

    public static async markAllTodos(user: string) {
        const todos = await TodosRepository.getTodos(user);

        let isCompleted = false;
        for (let todo of todos) {
            if (!todo.isCompleted) {
                isCompleted = true;
                break;
            }
        }

        const newTodos = await TodosRepository.markAllTodos(user, isCompleted);
        return newTodos;
    }
    
    public static async deleteTodo(id: string, user: string) {
        const todo = await TodosRepository.getTodo(id, user);
        if (!todo) throw new BadRequestErr('Cannot find todo');

        const deletedTodo = await TodosRepository.deleteTodo(id, user);
        return deletedTodo;
    }

    public static async deleteMarkedTodos(user: string) {
        const todos = await TodosRepository.deleteMarkedTodos(user);
        return todos;
    }
}