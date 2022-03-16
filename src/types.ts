import { Request } from "express";

export enum HttpStatus {
    ok = 200,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    internalError = 500
};

export enum ParameterType {
    body = 'body',
    params = 'params',
    query = 'query'
};

export interface AuthorizedRequest extends Request {
    user: string;
};