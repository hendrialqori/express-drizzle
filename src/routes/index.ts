import express from 'express';
import AuthController from '../controllers/auth.controller';
import UsersController from '../controllers/users.controller';

const apiRouter = express.Router()

apiRouter.get("/api/users", UsersController.getAll)

apiRouter.post("/api/auth/register", AuthController.register)


export default apiRouter

