import { Request, Response, Router } from "express";
import AsyncHandler from "express-async-handler";
import { Endpoints, HttpStatus } from "../data/app.constants";
//import { addAddress, deleteAddress, getAddressById, updateAddress, getAllAddress, makeAddressPrimary } from "../services/address.service";
import { addTrip } from "../services/trip.service";

const tripController = Router();

tripController.post(
  Endpoints.ROOT,
  AsyncHandler(async (req: Request, res: Response) => {
    const response = await addTrip(req);
    res.status(HttpStatus.CREATED).json(response);
  })
);

// tripController.get(
//   Endpoints.ID,
//   AsyncHandler(async (req: Request, res: Response) => {
//     const response = await getAddressById(req.params.id);
//     res.status(HttpStatus.OK).json(response);
//   })
// );

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
