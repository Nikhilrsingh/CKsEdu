import { AsyncHandler } from '../Utils/AsyncHandler.js';
import { DailyStudyGoal } from '../Models/dailyStudyGoal.model.js';
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const createDailyStudyGoal = AsyncHandler(async (req, res) => {
  const { goal } = req.body;
  const userId = req.user._id;

  const dailyGoal = await DailyStudyGoal.create({ userId, goal });
  return res.status(201).json(new ApiResponse(200, dailyGoal, "Daily study goal created successfully"));
});

const updateDailyStudyGoal = AsyncHandler(async (req, res) => {
  const { goal, progress } = req.body;
  const userId = req.user._id;

  const dailyGoal = await DailyStudyGoal.findOneAndUpdate(
    { userId, date: new Date().setHours(0, 0, 0, 0) }, // Update for today
    { goal, progress },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, dailyGoal, "Daily study goal updated successfully"));
});

const getDailyStudyGoal = AsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const dailyGoal = await DailyStudyGoal.findOne({ userId, date: new Date().setHours(0, 0, 0, 0) });
  return res.status(200).json(new ApiResponse(200, dailyGoal, "Daily study goal fetched successfully"));
});

export { createDailyStudyGoal, updateDailyStudyGoal, getDailyStudyGoal };