import express from 'express';
import TodosController from '../controllers/TodosController';

// Маршрутизатор задач. Описывает эндпоинты для управления списком задач.

const todosRouter = express.Router();

// TODO: add JOI verification
todosRouter.post('/', TodosController.createTodo); // Создать todo
todosRouter.get('/', TodosController.getTodos); // Получить все todo
todosRouter.put('/edit:id', TodosController.updateTodo); // Изменить todo
todosRouter.put('/mark/:id', TodosController.markTodo); // Сменить метку
todosRouter.put('/mark', TodosController.markAllTodos); // Отметить все/снять метки со всех
todosRouter.delete('/:id', TodosController.deleteTodo); // Удалить todo
todosRouter.delete('/', TodosController.deleteMarkedTodos); // Удалить все отмеченные

export default todosRouter;