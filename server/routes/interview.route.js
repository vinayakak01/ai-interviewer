import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import {
  analyzeResume,
  generateQuestion,
} from "../controllers/interview.controller.js";

const interviewRouter = express.Router();

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume);
interviewRouter.post("/generate-questions", isAuth, generateQuestion);

export default interviewRouter;
