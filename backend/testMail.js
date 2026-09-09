import dotenv from "dotenv";
dotenv.config();

const { sendReminderEmail } = await import("./utils/mailer.js");

sendReminderEmail(process.env.SMTP_USER, "Test Habit").then(() => {
  console.log("Done");
  process.exit(0);
});