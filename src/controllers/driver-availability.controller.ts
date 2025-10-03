import { Request, Response, Router } from "express";
import { Endpoints } from "../data/app.constants";
import AsyncHandler from "express-async-handler";
import {
  checkInDriver,
  checkOutDriver,
  getAvailabilityHistory,
  getTodayAvailability,
  getTodayAvailabilityForAllDrivers,
} from "../services/driver-availability.service";

const driverAvailabilityController = Router();

// 👉 Test route (keep if needed)
driverAvailabilityController.get(
  Endpoints.ROOT,
  AsyncHandler(async (req: Request, res: Response) => {
    res.json({ ds: "Success" });
  })
);

// 👉 POST /availability/check-in
driverAvailabilityController.post(
  Endpoints.CHECK_IN,
  AsyncHandler(async (req: Request, res: Response) => {
    const driverId = req.user._id;

    if (!driverId) {
      res.status(400).json({ success: false, message: "Driver ID is required" });
      return;
    }

    const availability = await checkInDriver(driverId as string);

    res.status(201).json({
      success: true,
      message: "Driver checked in successfully",
      data: availability,
    });
  })
);

driverAvailabilityController.post(
  Endpoints.CHECK_OUT,
  AsyncHandler(async (req: Request, res: Response) => {
    //   const driverId = req.user?.id || req.body.driverId;
    const driverId = req.user._id;

    if (!driverId) {
      res.status(400).json({ success: false, message: "Driver ID is required" });
      return;
    }

    const availability = await checkOutDriver(driverId as string);

    res.status(200).json({
      success: true,
      message: "Driver checked out successfully",
      data: availability,
    });
  })
);

driverAvailabilityController.get(
  Endpoints.TODAY,
  AsyncHandler(async (req: Request, res: Response) => {
    //   const driverId = req.user?.id || req.query.driverId;
    const driverId = req.user._id;

    if (!driverId) {
      res.status(400).json({ success: false, message: "Driver ID is required" });
      return;
    }

    const availability = await getTodayAvailability(driverId as string);

    if (!availability) {
      res.status(200).json({
        success: false,
        message: "No attendance record found for today",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Driver availability for today",
      data: availability,
    });
  })
);

driverAvailabilityController.get(
  "/history",
  AsyncHandler(async (req: Request, res: Response) => {
    const driverId = req.body.driverId;

    if (!driverId) {
      res.status(400).json({ success: false, message: "Driver ID is required" });
      return;
    }

    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: "Start date and end date are required",
      });
      return;
    }

    const history = await getAvailabilityHistory(driverId, startDate as string, endDate as string);

    res.status(200).json({
      success: true,
      message: "Driver availability history",
      count: history.length,
      data: history,
    });
  })
);

driverAvailabilityController.get(
  Endpoints.TODAY_ALL_DRIVERS,
  AsyncHandler(async (req: Request, res: Response) => {
    const availability = await getTodayAvailabilityForAllDrivers();

    res.status(200).json({
      success: true,
      message: "Drivers availability for today",
      data: availability.length ? availability : [],
    });
  })
);

export default driverAvailabilityController;
