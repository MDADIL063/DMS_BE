import mongoose, { Schema, model } from "mongoose";
import { SchemaNames } from "../data/app.constants";
import { IFeedback } from "../interfaces/feedBack.interface";
const feedbackSchema = new Schema<IFeedback>(
  {
    driver: { type: mongoose.Schema.Types.ObjectId, ref: SchemaNames.USER, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: SchemaNames.TRIP, required: true },
    comment: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: SchemaNames.USER, required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: SchemaNames.USER },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Feedback = model<IFeedback>(SchemaNames.FEEDBACK, feedbackSchema);
export default Feedback;
