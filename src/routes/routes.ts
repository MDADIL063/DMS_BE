import { Router } from "express";
import authController from "../controllers/auth.controller";
import driverController from "../controllers/driver.controller";
import { Routes, UserRoles } from "../data/app.constants";
import Auth from "../middleware/auth.middleware";
import vehicleController from "../controllers/vehicle.controller";
import customerController from "../controllers/customer.controller";
import vehicleTypeController from "../controllers/vehicleType.controller";
import dailyExpenseController from "../controllers/daily-expense.controller";
import addressController from "../controllers/address.controller";
import commonController from "../controllers/common.controller";
import driverAvailabilityController from "../controllers/driver-availability.controller";
import feedbackController from "../controllers/feedBack.controller";
import { adminDashboardController } from "../controllers/adminDashboard.controller";
import tripController from "../controllers/trip.controller";

const routes = Router();

routes.use(Routes.AUTH, authController);
routes.use(Routes.DRIVERS, Auth([UserRoles.ADMIN]), driverController);
routes.use(Routes.VEHICLES, vehicleController);
routes.use(Routes.CUSTOMERS, Auth([UserRoles.ADMIN]), customerController);
routes.use(Routes.VEHICLE_TYPE, Auth([UserRoles.ADMIN]), vehicleTypeController);
routes.use(Routes.DAILY_EXPENSE, Auth([UserRoles.ADMIN, UserRoles.DRIVER]), dailyExpenseController);
routes.use(Routes.ADDRESS, Auth([UserRoles.CUSTOMER]), addressController);
routes.use(Routes.COMMON, commonController);
routes.use(Routes.DRIVER_AVAILABILITY, Auth([UserRoles.DRIVER]), driverAvailabilityController);
routes.use(Routes.FEEDBACK, Auth([UserRoles.CUSTOMER, UserRoles.ADMIN]), feedbackController);
routes.use(Routes.ADMIN_DASHBOARD, adminDashboardController);

routes.use(Routes.TRIPS, Auth(), tripController); // Auth([UserRoles.CUSTOMER, UserRoles.ADMIN])
export default routes;
