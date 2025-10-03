import { Request } from "express";
import { ITrip } from "../interfaces/trip.interface";
import Trip from "../models/trip.model";
import validate from "../validators/validation";
import { AppError } from "../classes/app-error.class";
import { AppDefaults, HttpStatus, QueryBuilderKeys, SortBy, ValidationKeys } from "../data/app.constants";
import { IListResponse } from "../interfaces/response.interface";
import { buildQuery } from "./util.service";
import { IQuery } from "../interfaces/query.interface";

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
const getTrips = async (req: Request): Promise<IListResponse> => {
  // Build query using your query builder (like for drivers)
  const { query, queryParams } = buildQuery(QueryBuilderKeys.TRIP_LIST, req, {
    sort: AppDefaults.SORT,
    sortBy: SortBy.ASC,
  } as IQuery);
  console.log(query);

  // Fetch paginated trips
  const trips = await Trip.find(query)
    .populate("customer", "name email") // include customer details
    .populate("vehicle", "vehicleNumber company") // include vehicle details
    .sort([[queryParams.sort, queryParams.sortBy]])
    .skip(queryParams.page * queryParams.limit)
    .limit(queryParams.limit);
  // console.log(trips);

  // Total count for pagination
  const total = await Trip.countDocuments(query);

  return {
    total,
    data: trips,
  };
};

export { addTrip, getTrips };
