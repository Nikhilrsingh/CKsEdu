import { Router } from "express";
import { createDailyStudyGoal, updateDailyStudyGoal, getDailyStudyGoal } from "../Controllers/dailyStudyGoal.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();

router.route("/daily-goal").post(verifyJWT, createDailyStudyGoal);
router.route("/daily-goal").patch(verifyJWT, updateDailyStudyGoal);
router.route("/daily-goal").get(verifyJWT, getDailyStudyGoal);

export default router;