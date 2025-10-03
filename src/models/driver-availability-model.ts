import mongoose, { Schema, model } from "mongoose";
import { SchemaNames } from "../data/app.constants";
import { IDriverAvailability } from "../interfaces/driver-availability.interface";

const driverAvailabilitySchema = new Schema<IDriverAvailability>(
  {
    driver: { type: mongoose.Schema.Types.ObjectId, ref: SchemaNames.USER },
    date: { type: String, required: true },

    checkInTime: { type: Date },
    checkOutTime: { type: Date },
    status: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const DriverAvailability = model<IDriverAvailability>(SchemaNames.DRIVER_AVAILABILITY, driverAvailabilitySchema);
export default DriverAvailability;
