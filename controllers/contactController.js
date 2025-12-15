import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactMail = async (req, res) => {
  const {
    name,
    email,
    country,
    phone,
    adults,
    kids,
    infants,
    arrivalDate,
    departureDate,
    message,
  } = req.body;

  if (
    !name ||
    !email ||
    !country ||
    !phone ||
    !arrivalDate ||
    !departureDate ||
    !message
  ) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  try {
    // 1️⃣ Save to DB
    await Contact.create({
      name,
      email,
      country,
      phone,
      adults,
      kids,
      infants,
      arrivalDate,
      departureDate,
      message,
    });

    // 2️⃣ EMAIL CONTENT (TEXT VERSION)
    const textMessage = `
New Travel Inquiry

Name: ${name}
Email: ${email}
Country: ${country}
Phone: ${phone}

Adults: ${adults || 0}
Kids: ${kids || 0}
Infants: ${infants || 0}

Arrival Date: ${arrivalDate}
Departure Date: ${departureDate}

Message:
${message}
    `;

    // 3️⃣ EMAIL CONTENT (HTML VERSION)
    const htmlMessage = `
      <h2>New Travel Inquiry</h2>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Phone:</strong> ${phone}</p>

      <h3>Travel Details</h3>
      <p><strong>Adults:</strong> ${adults || 0}</p>
      <p><strong>Kids:</strong> ${kids || 0}</p>
      <p><strong>Infants:</strong> ${infants || 0}</p>
      <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
      <p><strong>Departure Date:</strong> ${departureDate}</p>

      <h3>Message</h3>
      <p>${message}</p>
    `;

    // 4️⃣ SEND EMAIL
    await transporter.sendMail({
      from: `"Travel Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Travel Inquiry",
      text: textMessage, // 🔥 IMPORTANT FIX
      html: htmlMessage,
    });

    return res.json({ message: "Contact message sent successfully" });
  } catch (error) {
    console.error("Contact mail error:", error);
    return res.status(500).json({ message: "Failed to send contact message" });
  }
};
