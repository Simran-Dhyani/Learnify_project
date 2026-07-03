import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app=express()
app.use(cors({
    origin :process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
import userRouter from "./routes/user.routers.js"
app.use("/api/v1/users",userRouter)
import noteRouter from "./routes/note.routers.js"
app.use("/api/v1/notes",noteRouter)
import aiQuizRouter from "./routes/aiQuiz.routers.js"
app.use("/api/v1/ai",aiQuizRouter)
import watchHistoryRouter from "./routes/watchHistory.routers.js"
app.use("/api/v1/watch-history", watchHistoryRouter);
export{app}