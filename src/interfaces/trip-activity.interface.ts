import { TripStatus } from "../data/app.constants";
import { ITrip } from "./trip.interface";

export interface ITripActivity {
  _id: string;
  trip: ITrip | string;
  tripStatus: `${TripStatus}`;
  message: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
