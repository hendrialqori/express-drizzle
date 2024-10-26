import crypto from 'node:crypto'
import { Request, Response, NextFunction } from 'express'
import winston from 'winston';

export const uuid = () => crypto.randomBytes(8).toString("hex")


export function logger(req: Request, res: Response, next: NextFunction) {
    const requestTime = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, `[${requestTime}]`);

    next()
}

const { combine, timestamp, prettyPrint, colorize } = winston.format;

export const winstonLogger = winston.createLogger({
    format: combine(
        timestamp(),
        prettyPrint(),
        colorize({ all: true }),
    ),
    transports: [new winston.transports.Console()]
})
