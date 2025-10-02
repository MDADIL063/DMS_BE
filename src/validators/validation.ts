import * as Joi from "joi";
import { UserRoles, ActivityStatus, ValidationKeys, DailyExpenseStatus } from "../data/app.constants";
import { ISettings } from "../interfaces/settings.interface";

const schemas = {
  [ValidationKeys.NEW_USER]: Joi.object({
    name: Joi.string().required(),
    userName: Joi.any(),
    email: Joi.string().email().required(),
    contactNumber: Joi.any(),
    licenseNumber: Joi.any(),
    licenseExpiryDate: Joi.date().optional(),
    password: Joi.string().required().min(8),
    googleId: Joi.any(),
    role: Joi.string().valid(UserRoles.ADMIN, UserRoles.DRIVER, UserRoles.CUSTOMER).required(),
    imageUrl: Joi.any(),
    status: Joi.string().valid(ActivityStatus.ACTIVE, ActivityStatus.INACTIVE),
  }),
  [ValidationKeys.UPDATE_ME]: Joi.object({
    name: Joi.string().required(),
    userName: Joi.any(),
    email: Joi.string().email().required(),
    contactNumber: Joi.any(),
    licenseNumber: Joi.any(),
    licenseExpiryDate: Joi.date().optional(),
    imageUrl: Joi.any(),
  }),

  [ValidationKeys.LOGIN]: Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),

  [ValidationKeys.UPDATE_DRIVER]: Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
    licenseNumber: Joi.any(),
    licenseExpiryDate: Joi.date().optional(),
    imageUrl: Joi.any(),
    status: Joi.string().valid(ActivityStatus.ACTIVE, ActivityStatus.INACTIVE),
  }),

  [ValidationKeys.VEHICLE]: Joi.object({
    vehicleNumber: Joi.string().required(),
    company: Joi.string().required(),
    capacity: Joi.string().required(),
    vehicleType: Joi.string().required(),
    mfgYear: Joi.any(),
    chassisNumber: Joi.any(),
    regNumber: Joi.any(),
    imageUrls: Joi.any(),
    status: Joi.string().valid(ActivityStatus.ACTIVE, ActivityStatus.INACTIVE),
    insuranceNumber: Joi.any().required(),
    insuranceExpiryDate: Joi.any().required(),
    fitnessNumber: Joi.any().required(),
    fitnessExpiryDate: Joi.any().required(),
    costPerKm: Joi.any().required(),
  }),
  [ValidationKeys.UPDATE_ACTIVITY_STATUS]: Joi.object({
    status: Joi.string().required().valid(ActivityStatus.ACTIVE, ActivityStatus.INACTIVE),
  }),
  [ValidationKeys.VEHICLE_TYPE]: Joi.object({
    name: Joi.string().required(),
  }),
  [ValidationKeys.DAILY_EXPENSE]: Joi.object({
    date: Joi.string().required(),
    vehicle: Joi.any(),
    expenseOnFuel: Joi.any(),
    challan: Joi.any(),
    otherExpenses: Joi.any(),
    remark: Joi.any(),
  }),
  [ValidationKeys.DAILY_EXPENSE_STATUS]: Joi.object({
    status: Joi.string().required().valid(DailyExpenseStatus.APPROVED, DailyExpenseStatus.PENDING),
  }),
  [ValidationKeys.ADDRESS]: Joi.object({
    name: Joi.string().required(),
    flatNo: Joi.any(),
    streetName: Joi.string().required(),
    area: Joi.string().required(),
    pincode: Joi.number().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    lat: Joi.any(),
    lng: Joi.any(),
  }),
  [ValidationKeys.SETTINGS]: Joi.object<ISettings>({
    pricePerKM: Joi.number().required(),
  }),
  [ValidationKeys.TRIP]: Joi.object({
    reason: Joi.any(),
    description: Joi.any(),
    itemToCarry: Joi.string().required(),
    startLocation: Joi.object().required(),
    endLocation: Joi.object().required(),
    distance: Joi.number().required(),
    duration: Joi.string().required(),
    capacity: Joi.number().required(),
    price: Joi.string().required(),
    startDateTime: Joi.date().required(),
    vehicle: Joi.string().required(),
  }),
};

const validate = (key: `${ValidationKeys}`, reqBody: any): boolean | string => {
  const { error } = schemas[key].validate(reqBody);
  return error?.details[0].message || false;
};

export default validate;
