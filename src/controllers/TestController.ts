import { NextFunction, Request, Response } from "express"
import { HttpStatus } from "../types"

export default class TestController {
    public static test(req: Request, res: Response, next: NextFunction) {
        res.status(HttpStatus.ok).send('All good');
    }
}