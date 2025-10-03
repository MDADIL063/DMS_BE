import { ITrip } from "./trip.interface";
import { IUser } from "./user.interface";

export interface IFeedback {
  driver: IUser;
  rating: number;
  trip: ITrip | string;
  comment?: string;
  createdBy: IUser;
  updatedBy?: IUser;
  createdAt: string | Date;
  updatedAt: string | Date;
}
