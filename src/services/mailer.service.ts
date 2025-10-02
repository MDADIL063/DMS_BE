import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  service: "gmail", // or use SMTP config of your provider
  auth: {
    user: process.env.MAIL_USER, // your email
    pass: process.env.MAIL_PASS, // app password (not normal password if Gmail)
  },
});

// send mail function
export const sendMail = async (to: string, subject: string, text: string) => {
  try {
    await mailer.sendMail({
      from: `"Driver Management" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending mail:", error);
  }
};
