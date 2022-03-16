import Todo from "../models/Todo";

export default class TodosRepository {
    public static async createTodo(id: string, user: string, description: string) {
        const todo = await Todo.create({ id, user, description, isCompleted: false });
        
        return todo;
    }

    public static async getTodo(id: string, user: string) {
        const todo = await Todo.findOne({ id, user });
        
        return todo;
    }

    public static async getTodos(user: string) {
        const todos = await Todo.find({ user });
        
        return todos;
    }

    public static async updateTodo(id: string, user: string, description: string) {
        const newTodo = await Todo.findOneAndUpdate({ id, user }, { description }, { new: true });
        return newTodo;
    }

    public static async markTodo(id: string, user: string, isCompleted: boolean) {
        const newTodo = await Todo.findOneAndUpdate({ id, user }, { isCompleted }, { new: true });
        
        return newTodo;
    }

    public static async markAllTodos(user: string, isCompleted: boolean) {
        await Todo.updateMany({ user }, { isCompleted });
        const todos = await TodosRepository.getTodos(user);

        return todos;
    }

    public static async deleteTodo(id: string, user: string) {
        const todo = await Todo.findOneAndDelete({ id, user });

        return todo;
    }

    public static async deleteMarkedTodos(user: string) {
        await Todo.deleteMany({ user, isCompleted: true });
        const todos = await TodosRepository.getTodos(user);

        return todos;
    }
}