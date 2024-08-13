import crypto from 'crypto'
import { Request, Response, NextFunction } from 'express'

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