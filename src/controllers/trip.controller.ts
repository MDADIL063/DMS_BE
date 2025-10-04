import { Request, Response, Router } from "express";
import AsyncHandler from "express-async-handler";
import { Endpoints, HttpStatus, TripStatus } from "../data/app.constants";
//import { addAddress, deleteAddress, getAddressById, updateAddress, getAllAddress, makeAddressPrimary } from "../services/address.service";
import {
  addTrip,
  getTrips,
  getSingleTrip,
  assignDriverToTrip,
  updateTripStatus,
  getAllTripActivities,
  updateTrip,
} from "../services/trip.service";
import Trip from "../models/trip.model";

const tripController = Router();

tripController.post(
  Endpoints.ROOT,
  AsyncHandler(async (req: Request, res: Response) => {
    const response = await addTrip(req);
    res.status(HttpStatus.CREATED).json(response);
  })
);

tripController.get(
  Endpoints.ROOT,
  AsyncHandler(async (req: Request, res: Response) => {
    const trips = await getTrips(req);
    res.status(HttpStatus.OK).json(trips);
  })
);

tripController.get(
  Endpoints.TRIP_COUNT,
  AsyncHandler(async (req: Request, res: Response) => {
    try {
      // Count all trips
      const totalTrips = await Trip.countDocuments();

      // Example: Count trips by status
      const newTrips = await Trip.countDocuments({ status: "New" });
      const scheduledTrips = await Trip.countDocuments({ status: "Scheduled" });
      const inProgressTrips = await Trip.countDocuments({ status: "InProgress" });
      const completedTrips = await Trip.countDocuments({ status: "Completed" });
      const cancelledTrips = await Trip.countDocuments({ status: "Cancelled" });

      res.status(200).json({
        success: true,
        message: "Trip counts fetched successfully",
        total: totalTrips,
        new: newTrips,
        scheduled: scheduledTrips,
        inProgress: inProgressTrips,
        completed: completedTrips,
        cancelled: cancelledTrips,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching trip counts",
        error: error.message,
      });
    }
  })
);

tripController.get(
  Endpoints.ID,
  AsyncHandler(async (req: Request, res: Response) => {
    const response = await getSingleTrip(req.params.id);
    res.status(HttpStatus.OK).json(response);
  })
);

tripController.put(
  Endpoints.ID,
  AsyncHandler(async (req: Request, res: Response) => {
    const response = await updateTrip(req.params.id, req.body);
    res.status(HttpStatus.OK).json(response);
  })
);

tripController.put(
  Endpoints.ASSIGN_DRIVER,
  AsyncHandler(async (req: Request, res: Response) => {
    const { tripId, driverId } = req.params;
    if (!tripId || !driverId) {
      res.status(400).json({
        success: false,
        message: "Trip or Driver missing",
      });
      return;
    }
    const response = await assignDriverToTrip(tripId, driverId);
    res.status(HttpStatus.OK).json(response);
  })
);

tripController.put(
  Endpoints.ASSIGN_DRIVER,
  AsyncHandler(async (req: Request, res: Response) => {
    const { tripId, driverId } = req.params;
    if (!tripId || !driverId) {
      res.status(400).json({
        success: false,
        message: "Trip or Driver missing",
      });
      return;
    }
    const response = await assignDriverToTrip(tripId, driverId);
    res.status(HttpStatus.OK).json(response);
  })
);

tripController.put(
  Endpoints.UPDATE_TRIP_STATUS,
  AsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    if (status === TripStatus.INPROGRESS || status === TripStatus.COMPLETED || status === TripStatus.CANCELLED) {
      const response = await updateTripStatus(id, status);
      res.status(HttpStatus.OK).json(response);
    } else {
      res.status(400).json({
        success: false,
        message: "Please provide valid trip status",
      });
      return;
    }
  })
);

tripController.get(
  Endpoints.TRIP_ACTIVITY,
  AsyncHandler(async (req: Request, res: Response) => {
    const response = await getAllTripActivities(req.params.id);
    res.status(HttpStatus.OK).json(response);
  })
);

export default tripController;
