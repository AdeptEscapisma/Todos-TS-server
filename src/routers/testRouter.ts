import express from 'express'
import TestController from '../controllers/TestController';

const testRouter = express.Router();

testRouter.get('/', TestController.test);

export default testRouter;