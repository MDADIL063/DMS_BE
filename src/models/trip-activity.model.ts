import { model, Schema } from "mongoose";
import { SchemaNames } from "../data/app.constants";
import { ITripActivity } from "../interfaces/trip-activity.interface";

const tripActivitySchema = new Schema<ITripActivity>(
  {
    trip: { type: Schema.Types.ObjectId, ref: SchemaNames.TRIP },
    message: { type: String, required: true },
    tripStatus: {
      type: String,
      enum: ["New", "Scheduled", "In Progress", "Completed", "Cancelled"],
      default: "New",
    },
  },
  { timestamps: true }
);

const TripActivity = model<ITripActivity>(SchemaNames.TRIP_ACTIVITY, tripActivitySchema);
export default TripActivity;
