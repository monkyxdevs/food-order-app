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
})