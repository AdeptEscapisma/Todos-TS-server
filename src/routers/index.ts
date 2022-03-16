import express from 'express'
import JWT from '../middleware/JWT';
import testRouter from './testRouter';
import todosRouter from './todosRouter';
import userRouter from './userRouter';

// Корневой маршрутизатор. Объединяет в себе остальные маршрутизаторы на сервере.
// TODO: Add Swagger docs

const router = express.Router();

router.use('/', testRouter);
router.use('/user', userRouter);
router.use('/todos', JWT.withUserAuthentication, todosRouter);

export default router;
