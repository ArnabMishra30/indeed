import express from 'express'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import jobRouter from './routes/job.route.js'

const app = express();
app.use(cookieParser())

//middlewares
app.use(express.json());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/job", jobRouter)

app.get("/", (req, res)=> {
    res.send("Hiii this the backend")
})

export default app;