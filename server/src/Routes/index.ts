import express from "express";
import userRouter from "./user";
import { foodRouter } from "./food";

const mainRouter = express.Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/food",foodRouter)

export default mainRouter;