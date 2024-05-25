import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import mainRouter from "./src/modules/mainRouter";

const port = process.env.PORT || 2000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(mainRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
