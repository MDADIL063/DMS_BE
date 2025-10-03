import { Request, Response, Router } from "express";
import AsyncHandler from "express-async-handler";
import { Endpoints, HttpStatus } from "../data/app.constants";
//import { addAddress, deleteAddress, getAddressById, updateAddress, getAllAddress, makeAddressPrimary } from "../services/address.service";
import { addTrip, getTrips, getSingleTrip } from "../services/trip.service";
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

// tripController.put(
//   Endpoints.ID,
//   AsyncHandler(async (req: Request, res: Response) => {
//     const response = await updateAddress(req);
//     res.status(HttpStatus.OK).json(response);
//   })
// );

// tripController.get(
//   Endpoints.ROOT,
//   AsyncHandler(async (req: Request, res: Response) => {
//     const response = await getAllAddress(req);
//     res.status(HttpStatus.OK).json(response);
//   })
// );

// tripController.delete(
//   Endpoints.ID,
//   AsyncHandler(async (req: Request, res: Response) => {
//     const response = await deleteAddress(req);
//     res.status(HttpStatus.OK).json(response);
//   })
// );

// tripController.put(
//   Endpoints.PRIMARY_ADDRESS,
//   AsyncHandler(async (req: Request, res: Response) => {
//     const response = await makeAddressPrimary(req);
//     res.status(HttpStatus.OK).json(response);
//   })
// );

export default tripController;
