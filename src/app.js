import express from "express";
import { ServerUp } from "./dto/factory.js";
import UserRoutes from "./routes/users.route.js";

const app = express();

app.use(express.json());

app.use("/api", UserRoutes);

ServerUp(app);
