import { Request } from "express";
import { ITrip } from "../interfaces/trip.interface";
import Trip from "../models/trip.model";
import validate from "../validators/validation";
import { AppError } from "../classes/app-error.class";
import { HttpStatus, ValidationKeys } from "../data/app.constants";

const addTrip = async (req: Request): Promise<ITrip> => {
  // Validating vehicle before saving into DB
  const errorMessage = validate(ValidationKeys.TRIP, req.body);
  if (errorMessage) {
    throw new AppError(HttpStatus.BAD_REQUEST, errorMessage);
  }

  // Saving data in DB
  const { reason, description, startLocation, endLocation, distance, duration, capacity, startDateTime, vehicle, itemToCarry, price } =
    req.body;

  const trip = new Trip({
    reason,
    description,
    customer: req.user._id,
    startLocation,
    endLocation,
    vehicle,
    itemToCarry,
    capacity,
    distance,
    duration,
    startDateTime,
    status: "New", // 🚀 new status when trip is first created
    price,
  });

  return await trip.save();
};

export { addTrip };
