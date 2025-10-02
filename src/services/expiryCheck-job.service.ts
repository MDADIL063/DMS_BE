import cron from "node-cron";
import User from "../models/user.model"; // adjust path
import Vehicle from "../models/vehicle.model"; // adjust path

cron.schedule("* 9 * * *", async () => {
  console.log("🔄 Checking expiry dates...");

  const now = new Date();

  try {
    // --- Check Drivers ---
    const expiredDrivers = await User.find({
      licenseExpiryDate: { $lt: now },
      status: "Active",
    });

    for (const driver of expiredDrivers) {
      driver.status = "Inactive";
      await driver.save();
      console.log(`⚠️ Driver ${driver.name} marked as Inactive (License expired).`);
    }

    // --- Check Vehicles ---
    const expiredVehicles = await Vehicle.find({
      $or: [{ insuranceExpiryDate: { $lt: now } }, { fitnessExpiryDate: { $lt: now } }],
      status: "Active",
    });

    for (const vehicle of expiredVehicles) {
      vehicle.status = "Inactive";
      await vehicle.save();
      console.log(`⚠️ Vehicle ${vehicle.vehicleNumber} marked as Inactive (Expired).`);
    }
  } catch (err) {
    console.error("❌ Error in cron job:", err);
  }
});
