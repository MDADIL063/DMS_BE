export enum AppMessages {
  DEFAULT_ERROR = "An unexpected error occurred, please try again later",
  NOT_FOUND = "Not found",
  DB_CONN_SUCCESS = "Connected to DB",
  DB_CONN_FAIL = "Error occured while connecting to DB",
  INVALID_CREDENTIALS = "Invalid credentials",
  ACCOUNT_INACTIVE = "Account is inactive, please contact to adminstrator",
  SESSION_EXPIRED = "Invalid Session/Session Expired",
  UNAUTHORIZED = "Unauthorized Access",
  USER_EXIST = "User already exist with same username, email or contact number",
  DRIVER_NOT_EXIST = "Driver not exist",
  VEHICLE_NOT_EXIST = "Vehicle not exist",
  ONLY_IMAGE_ALLOWED = "Only image files are allowed!",
  INVALID_IMAGE = "Invalid image file",
  CUSTOMER_NOT_EXIST = "Customer not exist",
  VEHICLE_TYPE_NOT_EXIST = "Vehicle type not exists",
  VEHICLE_WITH_VEHICLE_TYPE = "There are some vehicles associated with this vehicle type, Please delete them first",
  DAILY_EXPENSE_NOT_EXISTS = "Daily expense not exists",
  DAILY_EXPENSE_ALREADY_APPROVED = "Approved expense can not be update or delete",
  ADDRESS_NOT_EXISTS = "Address not exists",
  ADDRESS_NOT_ASSOSIATED_USER = "Address is not assosiate with you",
  ADDRESS_PRIMARY = "You can't delete primary address",
}

export enum SortBy {
  ASC = "asc",
  DESC = "desc",
}

export enum AppDefaults {
  ONE_DAY_IN_MILLISECONDS = 86400000,
  JWT_TOKEN_EXPIRES_IN = "1d",
  SORT = "createdAt",
  SORT_BY = SortBy.DESC,
  FILE_SIZE_LIMIT = 2097152, // keep images size < 2 MB
  REQ_FILE_KEY = "file",
  MULTIPLE_FILE_SIZE_LIMIT = 10485760, // keep all images size < 10 MB
}

export enum CommonConst {
  BASE64 = "base64",
  ASCII = "ascii",
  EMPTY_STRING = "",
  EMPTY_SPACE = " ",
  JWT_TOKEN_PREFIX = "Bearer ",
  Name = "name",
  VEHICLE_NUMBER = "vehicleNumber",
  I = "i",
  TOKEN_EXPIRED_ERROR = "TokenExpiredError",
  JWT_EXPIRED = "jwt expired",
}

export enum Environment {
  DEVELOPMENT = "development",
  UAT = "uat",
  PRODUCTION = "production",
}

export enum MongooseInternalKeys {
  CAST_ERROR = "CastError",
  OBJECT_ID = "ObjectId",
  ALREADY_EXIST_ERROR_CODE = 11000,
}

export enum MongooseExcludedKeys {
  PASSWORD = "-password",
  GOOGLE_ID = "-googleId",
}

export enum UserRoles {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  CUSTOMER = "CUSTOMER",
}

export enum ActivityStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}
export enum DailyExpenseStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
}
export enum DriverAvailabilityStatus {
  AVAILABLE = "Available",
  ON_TRIP = "On Trip",
  INACTIVE = "Inactive",
  OFF_DUTY = "Off Duty",
}
export enum Routes {
  ROOT = "/",
  AUTH = "/auth",
  DRIVERS = "/drivers",
  VEHICLES = "/vehicles",
  CUSTOMERS = "/customers",
  VEHICLE_TYPE = "/vehicle-type",
  DAILY_EXPENSE = "/daily-expense",
  DRIVER_AVAILABILITY = "/driver-availability",
  ADDRESS = "/address",
  COMMON = "/common",
  FEEDBACK = "/feedBack",
  ADMIN_DASHBOARD = "/admin/dashboard",
  TRIPS = "/trips",
}

export enum Endpoints {
  ROOT = "/",
  ID = "/:id",
  ME = "/me",
  LOGIN = "/login",
  LOGOUT = "/logout",
  REGISTER = "/register",
  GOOGLE_SIGNIN = "/google-login",
  UPDATE_STATUS = "/:id/status",
  DELETE_VEHICLE_IMAGE = "/:id/images/:imageId",
  PRIMARY_ADDRESS = "/:id/primary",
  SETTINGS = "/settings",
  CHECK_IN = "/check-in",
  CHECK_OUT = "/check-out",
  TODAY = "/today",
  VEHICLE_COUNT = "/vehicles-count",
  DRIVER_COUNT = "/drivers-count",
}

export enum ValidationKeys {
  NEW_USER = "new_user",
  LOGIN = "login",
  UPDATE_DRIVER = "update_driver",
  VEHICLE = "vehicle",
  VEHICLE_TYPE = "vehicle_type",
  UPDATE_ACTIVITY_STATUS = "update_activity_status",
  DAILY_EXPENSE = "daily_expense",
  DAILY_EXPENSE_STATUS = "daily_expense_status",
  UPDATE_ME = "update_me",
  ADDRESS = "address",
  SETTINGS = "settings",
  TRIP = "trip",
}

export enum SchemaNames {
  USER = "User",
  VEHICLE = "Vehicle",
  VEHICLE_TYPE = "Vehicle_type",
  DAILY_EXPENSE = "Daily_expense",
  ADDRESS = "Address",
  SETTINGS = "Settings",
  DRIVER_AVAILABILITY = "Driver_availability",
  FEEDBACK = "FeedBack",
  TRIP = "trip",
}

export enum QueryBuilderKeys {
  DRIVER_LIST = "driver_list",
  VEHICLE_LIST = "vehicle_list",
  CUSTOMER_LIST = "customer_list",
  VEHICLE_TYPE_LIST = "vehicle_type_list",
  DAILY_EXPENSE = "daily_expense",
  ADDRESS = "address",
  TRIP_LIST = "trip_list",
}

export enum ImageMimeType {
  "image/png" = "png",
  "image/jpeg" = "jpg",
  "image/jpg" = "jpg",
}

export enum ModuleNames {
  CUSTOMER = "customer",
  DRIVER = "driver",
  VEHICLE = "vehicle",
}

export enum AccountType {
  LOCAL = "local",
  GOOGLE = "google",
}

export enum PopulateKeys {
  VEHICLE_TYPE = "vehicleType",
  DAILY_EXPENSE = "vehicle createdBy updatedBy",
  TRIP = "customer vehicle driver",
}

export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}
