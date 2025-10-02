import { Router, Request, Response } from "express";
import { UserRoles } from "../data/app.constants";
import Auth from "../middleware/auth.middleware";
import User from "../models/user.model";
import Vehicle from "../models/vehicle.model";
import AsyncHandler from "express-async-handler";

const adminDashboardController = Router();

adminDashboardController.get(
  "/",
  //   Auth([UserRoles.ADMIN]),
  AsyncHandler(async (req: Request, res: Response) => {
    try {
      // Drivers
      const totalDrivers = await User.countDocuments({ role: UserRoles.DRIVER });
      const activeDrivers = await User.countDocuments({ role: UserRoles.DRIVER, status: "Active" });

      // Vehicles
      const totalVehicles = await Vehicle.countDocuments({});
      const activeVehicles = await Vehicle.countDocuments({ status: "Active" });

      // Customers
      const totalCustomers = await User.countDocuments({ role: UserRoles.CUSTOMER });

      // Trips
      //   const totalTrips = await Trip.countDocuments({});
      //   const newTrips = await Trip.countDocuments({ status: "New" });
      //   const inProgressTrips = await Trip.countDocuments({ status: "InProgress" });
      //   const completedTrips = await Trip.countDocuments({ status: "Completed" });
      //   const cancelledTrips = await Trip.countDocuments({ status: "Cancelled" });

      res.status(200).json({
        success: true,
        data: {
          drivers: { total: totalDrivers, active: activeDrivers },
          vehicles: { total: totalVehicles, active: activeVehicles },
          customers: { total: totalCustomers },
          //   trips: {
          //     total: totalTrips,
          //     new: newTrips,
          //     inProgress: inProgressTrips,
          //     completed: completedTrips,
          //     cancelled: cancelledTrips,
          //   },
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Error fetching dashboard data", error: error.message });
    }
  })
);

export { adminDashboardController };
