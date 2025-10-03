import { TripStatus } from "../data/app.constants";
import { IUser } from "./user.interface";

export interface ITrip {
  reason: string;
  description?: string;
  customer: IUser | string;
  driver?: IUser | string;
  vehicle: IUser | string;
  itemToCarry: string;
  capacity: number;
  startLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  endLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  distance: number; // km
  duration: string;
  status: `${TripStatus}`;
  price: string | number;
  startDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  tripStartDateTime: Date | string;
  tripCompletedDateTime: Date | string;
  tripCancelledDateTime: Date | string;
}
