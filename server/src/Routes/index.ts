<<<<<<< HEAD
import express from "express";
import userRouter from "./user";
import { foodRouter } from "./food";

const mainRouter = express.Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/food",foodRouter)

=======
import express from "express";
import userRouter from "./user";
import { foodRouter } from "./food";

const mainRouter = express.Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/food",foodRouter)

>>>>>>> 61fdff0a553d8ab22090404d4345fd223233ab3b
export default mainRouter;