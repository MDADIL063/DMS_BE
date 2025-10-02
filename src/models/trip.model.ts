import { model, Schema } from "mongoose";
import { SchemaNames } from "../data/app.constants";
import { ITrip } from "../interfaces/trip.interface";

const tripSchema = new Schema<ITrip>(
  {
    reason: { type: String, required: true },
    description: { type: Date, required: false },
    customer: { type: Schema.Types.ObjectId, ref: SchemaNames.USER, required: true },
    driver: { type: Schema.Types.ObjectId, ref: SchemaNames.USER },
    vehicle: { type: Schema.Types.ObjectId, ref: SchemaNames.VEHICLE },
    itemToCarry: { type: String, required: true },
    capacity: { type: Number, required: true },
    startLocation: {
      address: String,
      lat: Number,
      lng: Number,
    },
    endLocation: {
      address: String,
      lat: Number,
      lng: Number,
    },

    distance: { type: Number, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    startDateTime: { type: Date, required: true },

    status: {
      type: String,
      enum: ["New", "Scheduled", "InProgress", "Completed", "Cancelled"],
      default: "New",
    },
  },
  { timestamps: true }
);

const Trip = model<ITrip>(SchemaNames.TRIP, tripSchema);
export default Trip;
