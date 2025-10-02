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
  status: "New" | "Scheduled" | "InProgress" | "Completed" | "Cancelled";
  price: string | number;
  startDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
