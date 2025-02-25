import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import cron from "node-cron";

const prisma = new PrismaClient();

async function sendReminders() {
  try {
    const currentDate = new Date();
    const reminderDate = new Date();
    reminderDate.setDate(currentDate.getDate() + 3);

    const borrowings = await prisma.borrowing.findMany({
      where: {
        returnDate: {
          gte: currentDate,
          lte: reminderDate,
        },
      },
      include: {
        student: true,
        book: true,
      },
    });

    if (borrowings.length === 0) return;

    // Configure email transport (update with your SMTP settings)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const borrowing of borrowings) {
      const { student, book, returnDate } = borrowing;
      const formattedReturnDate = new Date(returnDate).toDateString();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: student.email,
        subject: "Library Book Return Reminder",
        text: `Hello ${student.name},\n\nThis is a reminder that your borrowed book "${book.title}" is due on ${formattedReturnDate}. Please return it on time to avoid penalties.\n\nThank you!\nLibrary Team`,
      };

      await transporter.sendMail(mailOptions);
    }

    console.log("Reminders sent successfully!");
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
}

// Run this script every day at 8 AM
cron.schedule("0 8 * * *", sendReminders);

sendReminders();
