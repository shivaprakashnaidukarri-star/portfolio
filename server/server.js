import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = 5000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio backend is running 🚀",
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["shivaprakashnaidukarri@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Portfolio Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to send email.",
      });
    }

    console.log("Email sent:", data);

    res.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});