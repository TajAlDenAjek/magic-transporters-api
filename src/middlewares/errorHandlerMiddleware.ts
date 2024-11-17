import { Request, Response, NextFunction } from 'express';

export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class InternalServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InternalServerError';
    }
}

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    let statusCode: number;
    let message: string;

    switch (err.constructor) {
        case BadRequestError:
            statusCode = 400;
            message = err.message || 'Bad request';
            break;
        case NotFoundError:
            statusCode = 404;
            message = err.message || 'Not found';
            break;
        case InternalServerError:
            statusCode = 500;
            message = err.message || 'Internal server error';
            break;
        default:
            statusCode = 500;
            message = 'An unexpected error occurred';
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};

export default errorHandlerMiddleware