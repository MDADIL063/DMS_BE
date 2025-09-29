import { IUser } from "./user.interface";

export interface IFeedback {
  driver: IUser;
  rating: number;
  comment?: string;
  createdBy: IUser;
  updatedBy?: IUser;
  createdAt: string | Date;
  updatedAt: string | Date;
}
