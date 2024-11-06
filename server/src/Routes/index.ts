import express from "express";

import { foodRouter } from "./food";
import { userRouter } from "./user";

export const mainRouter = express.Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/food",foodRouter)
