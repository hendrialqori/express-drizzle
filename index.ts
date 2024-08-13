import express from "express";
import dotenv from 'dotenv'

const PORT = 8000

const app = express()

dotenv.config()

app.get("/", function (req, res) {
    return res.json({
        status: 200,
        message: "Successfull"
    })
})

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});