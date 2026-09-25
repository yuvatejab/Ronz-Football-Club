import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Set up Nodemailer for Gmail since Resend does not allow @gmail.com as a From address
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ybandharapu@gmail.com', // Always send from this address
    pass: process.env.GMAIL_APP_PASSWORD // Setup a 16-character App Password in Google Account
  }
});

// API Endpoint for processing Join Form
app.post('/api/join', async (req, res) => {
  const { firstName, lastName, email, phone, position } = req.body;

  if (!firstName || !lastName || !email || !phone || !position) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const senderEmail = 'ybandharapu@gmail.com';

  try {
    // 1. Premium Email to Owner (Admin)
    await transporter.sendMail({
      from: `"Ronz FC Academy" <${senderEmail}>`,
      to: senderEmail, // Send notification to the club owner (ybandharapu@gmail.com)
      subject: `New Academy Applicant: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
             <h2 style="color: #dc2626; margin: 0; font-size: 24px;">RONZ FC</h2>
             <p style="color: #64748b; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Academy Application</p>
          </div>
          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">Applicant Profile</h3>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Primary Role:</strong> <span style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 14px;">${position}</span></p>

          <div style="margin-top: 32px; padding: 16px; background: #f8fafc; border-radius: 8px; font-size: 13px; color: #475569;">
            This application was submitted via the Ronz FC website.
          </div>
        </div>
      `,
    });

    // 2. Premium Email to the Applicant (User) - Dynamic To Address
    await transporter.sendMail({
      from: `"Ronz FC Academy" <${senderEmail}>`,
      to: email, // Fetched dynamically from form submission
      subject: `Application Received | Ronz FC Academy`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #dc2626; font-size: 28px; margin-top: 0;">RONZ FC<span style="color: #94a3b8;"> ACADEMY</span></h2>
          <p style="font-size: 16px; line-height: 1.6;">Hi ${firstName},</p>
          <p style="font-size: 16px; line-height: 1.6;">
            We have successfully received your application for the Ronz Football Club Academy.<br><br>
            Our recruitment staff will evaluate your profile (<strong>${position}</strong>) and we will reach out to you shortly regarding the next steps, scheduling, and trial dates.
          </p>

          <div style="margin: 32px 0; padding: 24px; background: #f8fafc; border-left: 4px solid #dc2626; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1e293b;">Application Summary</p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b;">Applicant: ${firstName} ${lastName}</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #64748b;">Position: <span style="text-transform: capitalize;">${position}</span></p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #64748b;">Contact: ${phone}</p>
          </div>

          <p style="font-size: 14px; color: #64748b; line-height: 1.6;">Excellence Demands Action.<br><strong>— The Ronz FC Coaching Staff</strong></p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: 'Emails sent successfully.' });
  } catch (error) {
    console.error("Email API Error:", error);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
});

// API Endpoint for processing Store Email Inquiry
app.post('/api/store-inquiry', async (req, res) => {
  const { name, email, phone, items, total } = req.body;

  if (!name || !email || !phone || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const senderEmail = 'ybandharapu@gmail.com';

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px;">
        <strong>${item.name}</strong> ${item.size && item.size !== 'One Size' ? `<br><span style="color:#64748b; font-size: 12px;">Size: ${item.size}</span>` : ''}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center; font-size: 14px;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-size: 14px;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  const tableHtml = `
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
      <thead>
        <tr style="background-color: #f8fafc;">
          <th style="padding: 10px; text-align: left; border-bottom: 2px solid #e2e8f0; font-size: 13px; color: #475569; text-transform: uppercase;">Item</th>
          <th style="padding: 10px; text-align: center; border-bottom: 2px solid #e2e8f0; font-size: 13px; color: #475569; text-transform: uppercase;">Qty</th>
          <th style="padding: 10px; text-align: right; border-bottom: 2px solid #e2e8f0; font-size: 13px; color: #475569; text-transform: uppercase;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding: 12px 10px; text-align: right; font-weight: bold; color: #0f172a; font-size: 15px;">Total Estimated Value:</td>
          <td style="padding: 12px 10px; text-align: right; font-weight: bold; color: #dc2626; font-size: 16px;">₹${total.toLocaleString('en-IN')}</td>
        </tr>
      </tfoot>
    </table>
  `;

  try {
    // 1. Alert the Admin (ybandharapu@gmail.com)
    await transporter.sendMail({
      from: `"Ronz FC Store" <${senderEmail}>`,
      to: senderEmail,
      subject: `New Store Inquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
             <h2 style="color: #dc2626; margin: 0; font-size: 24px;">RONZ FC STORE</h2>
             <p style="color: #64748b; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Inquiry Received</p>
          </div>
          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">Customer Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></p>
          <p><strong>Phone Number:</strong> ${phone}</p>

          <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-top: 32px;">Order Summary</h3>
          ${tableHtml}
        </div>
      `,
    });

    // 2. Automated confirmation to the Customer
    await transporter.sendMail({
      from: `"Ronz FC Store" <${senderEmail}>`,
      to: email, // Dynamic email provided in checkout
      subject: `Order Inquiry Received | Ronz FC Store`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #dc2626; font-size: 28px; margin-top: 0;">RONZ FC<span style="color: #94a3b8;"> STORE</span></h2>
          <p style="font-size: 16px; line-height: 1.6;">Hi ${name},</p>
          <p style="font-size: 16px; line-height: 1.6;">
            We have successfully received your inquiry for official Ronz FC merchandise. Our store management team is reviewing your items for inventory availability and will contact you shortly regarding payment and fulfillment.
          </p>

          <div style="margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1e293b; text-transform: uppercase; letter-spacing: 1px;">Inquiry Summary</p>
            ${tableHtml}
          </div>

          <p style="font-size: 14px; color: #64748b; line-height: 1.6;">Wear the badge with pride.<br><strong>— The Ronz FC Store Team</strong></p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: 'Inquiry emails sent.' });
  } catch (error) {
    console.error("Store Email API Error:", error);
    res.status(500).json({ error: 'Failed to send store inquiry emails.' });
  }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
