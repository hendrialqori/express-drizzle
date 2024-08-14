import express from 'express';
import AuthController from '../controllers/auth.controller';
import UsersController from '../controllers/users.controller';
import { isAuthenticate } from '../middlewares/auth.middleware';

const apiRouter = express.Router()

apiRouter.post("/api/auth/register", AuthController.register)
apiRouter.post("/api/auth/login", AuthController.login)
apiRouter.delete("/api/auth/logout", AuthController.logout)

apiRouter.get("/api/user/list", isAuthenticate, UsersController.list)
apiRouter.get("/api/user/:id", isAuthenticate, UsersController.get)
apiRouter.delete("/api/user/:id/remove", isAuthenticate, UsersController.remove)




export default apiRouter

