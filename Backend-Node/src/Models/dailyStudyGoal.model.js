import mongoose, { Schema } from "mongoose";

const dailyStudyGoalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const DailyStudyGoal = mongoose.model("DailyStudyGoal", dailyStudyGoalSchema);