import nodemailer from "nodemailer";

export const sendReminderEmail = async (toEmail, habitName) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Atiba Dar" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Reminder: ${habitName}`,
      text: `Don't forget to check in for "${habitName}" today!`,
      html: `<p>Hi life logger!, Don't forget to check in for <strong>${habitName}</strong> today! </p>`,
    });
    console.log(`Reminder email sent to ${toEmail} for habit: ${habitName}`);
  } catch (error) {
    console.error("Error sending reminder email:", error.message);
  }
};