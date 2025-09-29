import { DriverAvailabilityStatus } from "../data/app.constants";
import DriverAvailability from "../models/driver-availability-model";

export const checkInDriver = async (driverId: string) => {
  const today = new Date();
  const dateOnly = new Date(today.toDateString());

  // Check if a record already exists for this driver today
  let availability = await DriverAvailability.findOne({ driver: driverId, date: dateOnly });

  if (availability) {
    if (availability.checkInTime) {
      throw new Error("Driver already checked in today.");
    }
    // If record exists but no check-in, update
    availability.checkInTime = today;
    availability.status = DriverAvailabilityStatus.AVAILABLE;
    await availability.save();
  } else {
    // New record for today
    availability = await DriverAvailability.create({
      driver: driverId,
      date: dateOnly,
      checkInTime: today,
      status: DriverAvailabilityStatus.AVAILABLE,
    });
  }

  return availability;
};
export const checkOutDriver = async (driverId: string) => {
  const today = new Date();
  const dateOnly = new Date(today.toDateString()); // normalize to YYYY-MM-DD

  const availability = await DriverAvailability.findOne({ driver: driverId, date: dateOnly });

  if (!availability) {
    throw new Error("No check-in record found for today.");
  }

  if (availability.checkOutTime) {
    throw new Error("Driver already checked out today.");
  }

  // Update check-out time and status
  availability.checkOutTime = today;
  availability.status = DriverAvailabilityStatus.OFF_DUTY;

  // Calculate total working hours
  if (availability.checkInTime) {
    const diffMs = availability.checkOutTime.getTime() - availability.checkInTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // Add a virtual field (not stored in DB, but returned)
    (availability as any)._doc.totalWorkingHours = `${diffHours}h ${diffMinutes}m`;
  }

  await availability.save();
  return availability;
};

export const getTodayAvailability = async (driverId: string) => {
  const today = new Date();
  const dateOnly = new Date(today.toDateString()); // normalize to YYYY-MM-DD

  const availability = await DriverAvailability.findOne({ driver: driverId, date: dateOnly });

  if (!availability) {
    return null;
  }

  // Calculate working hours if check-out exists
  if (availability.checkInTime && availability.checkOutTime) {
    const diffMs = availability.checkOutTime.getTime() - availability.checkInTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    (availability as any)._doc.totalWorkingHours = `${diffHours}h ${diffMinutes}m`;
  }

  return availability;
};

export const getAvailabilityHistory = async (driverId: string, startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    throw new Error("Start date and end date are required");
  }

  const start = new Date(new Date(startDate).toDateString());
  const end = new Date(new Date(endDate).toDateString());

  if (start > end) {
    throw new Error("Start date cannot be greater than end date");
  }

  const query = {
    driver: driverId,
    date: {
      $gte: start,
      $lte: end,
    },
  };

  const records = await DriverAvailability.find(query).sort({ date: -1 });

  // Calculate working hours for each record
  return records.map((rec) => {
    let totalWorkingHours: string | null = null;

    if (rec.checkInTime && rec.checkOutTime) {
      const diffMs = rec.checkOutTime.getTime() - rec.checkInTime.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      totalWorkingHours = `${diffHours}h ${diffMinutes}m`;
    }

    return {
      ...rec.toObject(),
      totalWorkingHours,
    };
  });
};

export const updateDriverStatus = async (driverId: string, status: `${DriverAvailabilityStatus}`) => {
  const today = new Date(new Date().toDateString());

  // Find today's attendance record
  const availability = await DriverAvailability.findOne({
    driver: driverId,
    date: today,
  });

  if (!availability) {
    throw new Error("Driver has not checked in today");
  }

  // Update status
  availability.status = status;
  await availability.save();

  return availability;
};
