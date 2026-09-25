import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, position } = req.body;

  if (!firstName || !lastName || !email || !phone || !position) {
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

  try {
    // 1. Premium Email to Owner (Admin)
    await transporter.sendMail({
      from: `"Ronz FC Academy" <${senderEmail}>`,
      to: senderEmail,
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

    return res.status(200).json({ success: true, message: 'Emails sent successfully.' });
  } catch (error) {
    console.error("Email API Error:", error);
    return res.status(500).json({ error: 'Failed to send emails.' });
  }
}
