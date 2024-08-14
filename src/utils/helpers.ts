import crypto from 'crypto'
import { Request, Response, NextFunction } from 'express'
import winston from 'winston';

export function random() {
    return crypto.randomBytes(128).toString("base64")
}

export function authentication(salt: string, password: string) {
    return crypto
        .createHmac("sha256", [salt, password].join("-"))
        .update(process.env.SECRET)
        .digest("hex")
}


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
