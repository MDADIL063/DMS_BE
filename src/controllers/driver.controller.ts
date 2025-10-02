import { Request, Response, Router } from "express";
import AsyncHandler from "express-async-handler";
import { AppMessages, Endpoints, HttpStatus, ModuleNames, UserRoles } from "../data/app.constants";
import { createUser } from "../services/user.service";
import { deleteDriver, getDrivers, getSingleDriver, updateDriver, updateDriverStatus } from "../services/driver.service";
import { AppError } from "../classes/app-error.class";
import { removeFileFromFirebase, uploadFileOnFirebase } from "../services/file-upload.service";
import imageValidator from "../validators/image.validator";
import User from "../models/user.model";

const driverController = Router();

driverController.post(
  Endpoints.ROOT,
  imageValidator,
  AsyncHandler(async (req: Request, res: Response) => {
    let uploadedFileUrl = null;
    if (req.file) {
      uploadedFileUrl = await uploadFileOnFirebase(req.file as Express.Multer.File, ModuleNames.DRIVER);
      if (!uploadedFileUrl) {
        throw new AppError(HttpStatus.BAD_REQUEST, AppMessages.INVALID_IMAGE);
      }
    }
    req.body.imageUrl = uploadedFileUrl;
    req.body.role = UserRoles.DRIVER;
    const response = await createUser(req.body);
    res.status(HttpStatus.CREATED).json(response);
  })
);

driverController.get(
  Endpoints.ROOT,
  AsyncHandler(async (req: Request, res: Response) => {
    const response = await getDrivers(req);
    res.status(HttpStatus.OK).json(response);
  })
);

// GET total and active driver count

driverController.get(
  Endpoints.DRIVER_COUNT,
  AsyncHandler(async (req: Request, res: Response) => {
    try {
      const totalDrivers = await User.countDocuments({ role: "DRIVER" });
      const activeDrivers = await User.countDocuments({ role: "DRIVER", status: "Active" });

      res.status(200).json({
        success: true,
        message: "Driver counts fetched successfully",
        total: totalDrivers,
        active: activeDrivers,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching driver counts", error: error.message });
    }
  })
);

driverController.get(
  Endpoints.ID,
  AsyncHandler(async (req: Request, res: Response) => {
    const driver = await getSingleDriver(req.params.id);
    if (!driver) {
      throw new AppError(HttpStatus.NOT_FOUND, AppMessages.DRIVER_NOT_EXIST);
    }
    res.status(HttpStatus.OK).json(driver);
  })
);

driverController.put(
  Endpoints.ID,
  imageValidator,
  AsyncHandler(async (req: Request, res: Response) => {
    // TODO: All the firebase images upload functionality need to be move in services
    let uploadedFileUrl = null;
    if (req.file) {
      const driver = await getSingleDriver(req.params.id);
      if (driver?.imageUrl) {
        await removeFileFromFirebase(driver?.imageUrl);
      }
      uploadedFileUrl = await uploadFileOnFirebase(req.file as Express.Multer.File, ModuleNames.DRIVER);
      if (!uploadedFileUrl) {
        throw new AppError(HttpStatus.BAD_REQUEST, AppMessages.INVALID_IMAGE);
      }
    }
    req.body.imageUrl = uploadedFileUrl;
    const response = await updateDriver(req.params.id, req.body);
    res.status(HttpStatus.OK).json(response);
  })
);

driverController.put(
  Endpoints.UPDATE_STATUS,
  AsyncHandler(async (req: Request, res: Response) => {
    const response = await updateDriverStatus(req.params.id, req.body);
    res.status(HttpStatus.OK).json(response);
  })
);

driverController.delete(
  Endpoints.ID,
  AsyncHandler(async (req: Request, res: Response) => {
    const response = await deleteDriver(req.params.id);
    res.status(HttpStatus.OK).json(response);
  })
);

export default driverController;
