import cron from "node-cron";
import nodemailer from "nodemailer";
import User from "../models/user.model";
import Vehicle from "../models/vehicle.model";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// cron.schedule("* * * * *", async () => {
cron.schedule("* 9 * * *", async () => {
  console.log("🔄 Checking expiries...");

  const now = new Date();
  const next7Days = new Date();
  next7Days.setDate(now.getDate() + 7); // add 7 days

  // Check User license expiry
  const expiringUsers = await User.find({
    licenseExpiryDate: { $gte: now, $lte: next7Days },
  });

  for (const user of expiringUsers) {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      //   to: user.email,
      to: "khanmdadil063@gmail.com",
      subject: "License Expiry Reminder",
      text: `Hello ${user.name}, your license will expire on ${user.licenseExpiryDate?.toDateString()}. Please renew it.`,
    });
    console.log(`📧 Sent license expiry reminder to ${user.email}`);
  }

  // Check Vehicle expiry
  const expiringVehicles = await Vehicle.find({
    $or: [{ insuranceExpiryDate: { $gte: now, $lte: next7Days } }, { fitnessExpiryDate: { $gte: now, $lte: next7Days } }],
  });

  for (const vehicle of expiringVehicles) {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: "khanmdadil063@gmail.com", // or map to owner email if you store it
      subject: "Vehicle Expiry Reminder",
      text: `Vehicle ${vehicle.vehicleNumber} has an expiry soon:
        Insurance: ${vehicle.insuranceExpiryDate ? new Date(vehicle.insuranceExpiryDate).toDateString() : "N/A"}
        Fitness: ${vehicle.fitnessExpiryDate ? new Date(vehicle.fitnessExpiryDate).toDateString() : "N/A"}`,
    });
    console.log(`📧 Sent vehicle expiry reminder for ${vehicle.vehicleNumber}`);
  }

  // check and convert the status

  console.log("🔄 Checking expiry dates...");

  const now1 = new Date();

  try {
    // --- Check Drivers ---
    const expiredDrivers = await User.find({
      licenseExpiryDate: { $lt: now1 },
      status: "Active",
    });

    for (const driver of expiredDrivers) {
      driver.status = "Inactive";
      await driver.save();
      console.log(`⚠️ Driver ${driver.name} marked as Inactive (License expired).`);
    }

    // --- Check Vehicles ---
    const expiredVehicles = await Vehicle.find({
      $or: [{ insuranceExpiryDate: { $lt: now1 } }, { fitnessExpiryDate: { $lt: now1 } }],
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
