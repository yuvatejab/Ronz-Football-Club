import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, items, total } = req.body;

  if (!name || !email || !phone || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const senderEmail = 'ybandharapu@gmail.com';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

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
    // 1. Alert the Admin
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

    return res.status(200).json({ success: true, message: 'Inquiry emails sent.' });
  } catch (error) {
    console.error("Store Email API Error:", error);
    return res.status(500).json({ error: 'Failed to send store inquiry emails.' });
  }
}
