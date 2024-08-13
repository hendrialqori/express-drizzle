import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"
import { logger } from "./utils/helpers";
import apiRouter from "./routes";
import { errorResponse } from "./middlewares/error.middleware";

dotenv.config()

const PORT = 3000

const app = express()
app.use(cors({ credentials: true }))
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie middleware
app.use(cookieParser())
// api router 
app.use(apiRouter)
// error response middleware
app.use(errorResponse)
// logger request
app.use(logger)


app.get("/", function (req, res) {
    return res.json({
        status: 200,
        message: "Successfull"
    })
})

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});