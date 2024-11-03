<<<<<<< HEAD
import express from "express";
const app = express();
import cors from "cors";
import mainRouter from "./Routes";

app.use(express.json());
app.use(cors());

app.use("/api/m3",mainRouter);

const port = 3000;

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
=======
import express from "express";
const app = express();
import cors from "cors";
import mainRouter from "./Routes";

app.use(express.json());
app.use(cors());

app.use("/api/m3",mainRouter);

const port = 3000;

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
>>>>>>> 61fdff0a553d8ab22090404d4345fd223233ab3b
})