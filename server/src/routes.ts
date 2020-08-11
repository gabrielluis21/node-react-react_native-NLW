import express from "express";
import ClassesController from "./controllers/ClassesController";

const Routes = express.Router();
const classController = new ClassesController();

Routes.post("/classes", classController.create);

Routes.get("/classes", classController.index);

export default Routes;