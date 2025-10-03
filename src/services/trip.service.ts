import { Request } from "express";
import { AppError } from "../classes/app-error.class";
import {
  AppDefaults,
  DriverAvailabilityStatus,
  HttpStatus,
  PopulateKeys,
  QueryBuilderKeys,
  SortBy,
  TripStatus,
  ValidationKeys,
} from "../data/app.constants";
import { IQuery } from "../interfaces/query.interface";
import { IListResponse } from "../interfaces/response.interface";
import { ITrip } from "../interfaces/trip.interface";
import Trip from "../models/trip.model";
import validate from "../validators/validation";
import { buildQuery } from "./util.service";
import { updateDriverStatus } from "./driver-availability.service";
import { ITripActivity } from "../interfaces/trip-activity.interface";
import TripActivity from "../models/trip-activity.model";

const addTrip = async (req: Request): Promise<ITrip> => {
  // Validating vehicle before saving into DB
  const errorMessage = validate(ValidationKeys.TRIP, req.body);
  if (errorMessage) {
    throw new AppError(HttpStatus.BAD_REQUEST, errorMessage);
  }

  // Saving data in DB
  const { reason, description, startLocation, endLocation, distance, duration, capacity, startDateTime, vehicle, itemToCarry, price } =
    req.body;

  const newTrip = new Trip({
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
    status: TripStatus.NEW, // 🚀 new status when trip is first created
    price,
  });

  const trip = await newTrip.save();
  await addTripActivity(trip._id.toString(), "Trip created", TripStatus.NEW);
  return trip;
};
const getTrips = async (req: Request): Promise<IListResponse> => {
  // Build query using your query builder (like for drivers)
  const { query, queryParams } = buildQuery(QueryBuilderKeys.TRIP_LIST, req, {
    sort: AppDefaults.SORT,
    sortBy: SortBy.ASC,
  } as IQuery);
  // console.log(query);

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

const getSingleTrip = async (id: string): Promise<ITrip | null> => {
  return await Trip.findOne({ _id: id }).populate(PopulateKeys.TRIP);
};

const assignDriverToTrip = async (tripId: string, driverId: string): Promise<ITrip | null> => {
  const trip = await Trip.findOneAndUpdate({ _id: tripId }, { driver: driverId, status: TripStatus.SCHEDULED }).populate(PopulateKeys.TRIP);
  await addTripActivity(tripId, "Trip scheduled", TripStatus.SCHEDULED);
  return trip;
};

const updateTripStatus = async (tripId: string, status: TripStatus): Promise<ITrip | null> => {
  const updateData: Partial<ITrip> = { status };

  const trip: any = await Trip.findOne({ _id: tripId }).populate(PopulateKeys.TRIP).lean();

  if (status === TripStatus.INPROGRESS) {
    updateData.tripStartDateTime = new Date().toISOString();
    await updateDriverStatus(trip?.driver?._id, DriverAvailabilityStatus.ON_TRIP);
    await addTripActivity(tripId, "Trip started", TripStatus.INPROGRESS);
  }

  if (status === TripStatus.COMPLETED) {
    updateData.tripCompletedDateTime = new Date().toISOString();
    await updateDriverStatus(trip?.driver?._id, DriverAvailabilityStatus.AVAILABLE);
    await addTripActivity(tripId, "Trip completed", TripStatus.COMPLETED);
  }

  if (status === TripStatus.CANCELLED) {
    updateData.tripCancelledDateTime = new Date().toISOString();
    await addTripActivity(tripId, "Trip cancelled", TripStatus.CANCELLED);
  }

  return Trip.findOneAndUpdate({ _id: tripId }, updateData).populate(PopulateKeys.TRIP) as unknown as ITrip;
};

const addTripActivity = async (tripId: string, message: string, tripStatus: `${TripStatus}`): Promise<ITripActivity | null> => {
  const tripActivity = new TripActivity({
    trip: tripId,
    message,
    tripStatus,
  });

  return await tripActivity.save();
};

const getAllTripActivities = async (tripId: string): Promise<ITripActivity[]> => {
  return await TripActivity.find({ trip: tripId })
    .populate("trip") // include customer details
    .sort([[AppDefaults.SORT as string, -1]]);
};

export { addTrip, getSingleTrip, getTrips, assignDriverToTrip, updateTripStatus, getAllTripActivities };
