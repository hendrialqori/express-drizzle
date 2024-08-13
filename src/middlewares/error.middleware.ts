import type { Request, Response, NextFunction } from "express";
import { ZodError } from 'zod'
import { ResponseError } from "../utils/response-error";

export function errorResponse(error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof ZodError) {
        response.status(400).json({
            type: `Validation Error`,
            errors: error.flatten()
        })
    } else if (error instanceof ResponseError) {
        response.status(error.status).json({
            type: "Response Error",
            errors: error.message
        });
    } else {
        response.status(500).json({
            type: "Unknown Error",
            errors: error.message
        });
    }
}