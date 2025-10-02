import { ActivityStatus } from "../data/app.constants";
import { IVehicleType } from "./vehicle-type.interface";

export interface IVehicle {
  _id?: string;
  vehicleNumber: string;
  company: string;
  capacity: number;
  mfgYear?: any;
  vehicleType: IVehicleType | string | null;
  chassisNumber?: string;
  regNumber?: string;
  imageUrls?: string | IVehicleImage[];
  status: `${ActivityStatus}`;
  insuranceNumber: string;
  insuranceExpiryDate: Date | string;
  fitnessNumber: string;
  fitnessExpiryDate: Date | string;
  costPerKm: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVehicleImage {
  id: string;
  imageUrl: string;
}
