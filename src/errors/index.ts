import APIError from './APIError';
import { HttpStatus } from '../types'

// Здесь перечисляются базовые ошибки работы сервера.
// Далее они используются в различных контроллерах и middleware-функциях

export class BadRequestErr extends APIError {
    constructor(name: string, isOperational: boolean = true, description: string = 'Bad request') {
        super(name, HttpStatus.badRequest, isOperational, description);
    }
}

export class UnauthorizedErr extends APIError {
    constructor(name: string, isOperational: boolean = true, description: string = 'Unauthorized') {
        super(name, HttpStatus.unauthorized, isOperational, description);
    }
}

export class ForbiddenErr extends APIError {
    constructor(name: string, isOperational: boolean = true, description: string = 'Forbidden') {
        super(name, HttpStatus.forbidden, isOperational, description);
    }
}

export class NotFoundErr extends APIError {
    constructor(name: string, isOperational: boolean = true, description: string = 'Not found') {
        super(name, HttpStatus.notFound, isOperational, description);
    }
}

export class InternalErr extends APIError {
    constructor(name: string, isOperational: boolean = false, description: string = 'Internal server error') {
        super(name, HttpStatus.internalError, isOperational, description);
    }
}
